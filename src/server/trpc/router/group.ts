import { z } from "zod";

import { router, protectedProcedure } from "@server/trpc/trpc";

import getGroupTable from "@misc/getGroupTable";

export const groupsRouter = router({
  find: protectedProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input, ctx }) => {
      const { code } = input;
      const { id } = ctx.session.user;

      const matches = await ctx.prisma.match.findMany({
        where: {
          code: {
            contains: code,
          },
        },
        orderBy: {
          date: "asc",
        },
        include: {
          results: {
            where: {
              user: {
                id,
              },
            },
          },
        },
      });

      const results = await ctx.prisma.result.findMany({
        where: {
          user: {
            id,
          },
          match: {
            code: {
              contains: code,
            },
          },
        },
      });

      const table = getGroupTable(matches, results);

      return { matches, table };
    }),
});
