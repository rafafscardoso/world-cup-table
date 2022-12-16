import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "@server/trpc/trpc";

import setPlayoff from "@misc/setPlayoff";
import getGroupTable from "@misc/getGroupTable";

export const resultsRouter = router({
  add: protectedProcedure
    .input(
      z.object({
        homeTeamScore: z.number(),
        awayTeamScore: z.number(),
        matchId: z.string(),
        winner: z.enum(["home", "away"]).optional().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { homeTeamScore, awayTeamScore, matchId, winner } = input;
      const { id } = ctx.session.user;

      const match = await ctx.prisma.match.findUnique({
        where: {
          id: matchId,
        },
        include: {
          results: true,
        },
      });

      if (!match) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Match not found",
        });
      }

      const resultResponse = await ctx.prisma.result.upsert({
        where: {
          matchId_userId: {
            matchId,
            userId: id,
          },
        },
        include: {
          match: true,
        },
        update: {
          homeTeamScore,
          awayTeamScore,
          winnerCode:
            winner === "home"
              ? String(match.results[0]?.homeTeamCode)
              : winner === "away"
              ? String(match.results[0]?.awayTeamCode)
              : homeTeamScore > awayTeamScore
              ? String(match.results[0]?.homeTeamCode)
              : String(match.results[0]?.awayTeamCode),
        },
        create: {
          homeTeamScore,
          awayTeamScore,
          winnerCode:
            winner === "home"
              ? String(match.homeTeamCode)
              : winner === "away"
              ? String(match.awayTeamCode)
              : homeTeamScore > awayTeamScore
              ? String(match.homeTeamCode)
              : String(match.awayTeamCode),
          homeTeamCode: String(match.homeTeamCode),
          awayTeamCode: String(match.awayTeamCode),
          match: {
            connect: {
              id: matchId,
            },
          },
          user: {
            connect: {
              id,
            },
          },
        },
      });

      const code = match.code.split("_")[0];

      if (match?.stage === "Group_Stage") {
        const previousResults = await ctx.prisma.result.findMany({
          where: {
            match: {
              code: {
                contains: code,
              },
            },
            user: {
              id,
            },
          },
          include: {
            match: true,
          },
        });

        if (previousResults.length === 6) {
          const { winnerCode, runnerUpCode } = setPlayoff(code);

          const matches = await ctx.prisma.match.findMany({
            where: {
              code: {
                contains: code,
              },
            },
          });

          const table = getGroupTable(matches, previousResults);

          const [winnerMatch, runnerUpMatch] = await ctx.prisma.$transaction([
            ctx.prisma.match.findUnique({
              where: {
                code: winnerCode,
              },
            }),
            ctx.prisma.match.findUnique({
              where: {
                code: runnerUpCode,
              },
            }),
          ]);

          if (!winnerMatch || !runnerUpMatch) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Match not found",
            });
          }

          await ctx.prisma.$transaction([
            ctx.prisma.result.upsert({
              where: {
                matchId_userId: {
                  matchId: winnerMatch?.id,
                  userId: id,
                },
              },
              update: {
                match: {
                  connect: {
                    code: winnerCode,
                  },
                },
                homeTeamCode: table[0]?.teamCode,
              },
              create: {
                user: {
                  connect: {
                    id,
                  },
                },
                match: {
                  connect: {
                    code: winnerCode,
                  },
                },
                homeTeamCode: table[0]?.teamCode,
              },
            }),
            ctx.prisma.result.upsert({
              where: {
                matchId_userId: {
                  matchId: runnerUpMatch?.id,
                  userId: id,
                },
              },
              update: {
                match: {
                  connect: {
                    code: runnerUpCode,
                  },
                },
                awayTeamCode: table[1]?.teamCode,
              },
              create: {
                user: {
                  connect: {
                    id,
                  },
                },
                match: {
                  connect: {
                    code: runnerUpCode,
                  },
                },
                awayTeamCode: table[1]?.teamCode,
              },
            }),
          ]);
        }
        return;
      }
      const { winnerCode: winnerResponse, runnerUpCode: runnerUpResponse } =
        setPlayoff(code);

      const [winnerCode, winnerPosition] = winnerResponse.split("_");

      const winnerMatch = await ctx.prisma.match.findUnique({
        where: {
          code: winnerCode,
        },
      });

      if (!winnerMatch) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Match not found",
        });
      }

      if (winnerPosition === "home") {
        await ctx.prisma.result.upsert({
          where: {
            matchId_userId: {
              matchId: winnerMatch.id,
              userId: id,
            },
          },
          update: {
            match: {
              connect: {
                code: winnerCode,
              },
            },
            homeTeamCode: resultResponse.winnerCode,
          },
          create: {
            user: {
              connect: {
                id,
              },
            },
            match: {
              connect: {
                code: winnerCode,
              },
            },
            homeTeamCode: resultResponse.winnerCode,
          },
        });
      } else {
        await ctx.prisma.result.upsert({
          where: {
            matchId_userId: {
              matchId: winnerMatch.id,
              userId: id,
            },
          },
          update: {
            match: {
              connect: {
                code: winnerCode,
              },
            },
            awayTeamCode: resultResponse.winnerCode,
          },
          create: {
            user: {
              connect: {
                id,
              },
            },
            match: {
              connect: {
                code: winnerCode,
              },
            },
            awayTeamCode: resultResponse.winnerCode,
          },
        });
      }

      if (runnerUpResponse) {
        const [runnerUpCode, runnerUpPosition] = runnerUpResponse.split("_");

        const runnerUpMatch = await ctx.prisma.match.findUnique({
          where: {
            code: runnerUpCode,
          },
        });

        if (!runnerUpMatch) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Match not found",
          });
        }

        if (runnerUpPosition === "home") {
          await ctx.prisma.result.upsert({
            where: {
              matchId_userId: {
                matchId: runnerUpMatch.id,
                userId: id,
              },
            },
            update: {
              match: {
                connect: {
                  code: runnerUpCode,
                },
              },
              homeTeamCode:
                resultResponse.winnerCode === resultResponse.homeTeamCode
                  ? resultResponse.awayTeamCode
                  : resultResponse.homeTeamCode,
            },
            create: {
              user: {
                connect: {
                  id,
                },
              },
              match: {
                connect: {
                  code: runnerUpCode,
                },
              },
              homeTeamCode:
                resultResponse.winnerCode === resultResponse.homeTeamCode
                  ? resultResponse.awayTeamCode
                  : resultResponse.homeTeamCode,
            },
          });
        } else {
          await ctx.prisma.result.upsert({
            where: {
              matchId_userId: {
                matchId: runnerUpMatch.id,
                userId: id,
              },
            },
            update: {
              match: {
                connect: {
                  code: runnerUpCode,
                },
              },
              awayTeamCode:
                resultResponse.winnerCode === resultResponse.homeTeamCode
                  ? resultResponse.awayTeamCode
                  : resultResponse.homeTeamCode,
            },
            create: {
              user: {
                connect: {
                  id,
                },
              },
              match: {
                connect: {
                  code: runnerUpCode,
                },
              },
              awayTeamCode:
                resultResponse.winnerCode === resultResponse.homeTeamCode
                  ? resultResponse.awayTeamCode
                  : resultResponse.homeTeamCode,
            },
          });
        }
      }
    }),
});
