import { router, protectedProcedure } from "@server/trpc/trpc";

export const playoffsRouter = router({
  find: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const [matches, results] = await ctx.prisma.$transaction([
      ctx.prisma.match.findMany({
        where: {
          stage: {
            not: "Group_Stage",
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
      }),
      ctx.prisma.result.findMany({
        where: {
          user: {
            id,
          },
          match: {
            code: {
              contains: "playoff",
            },
          },
        },
      }),
    ]);

    return { matches, results };
  }),
});
