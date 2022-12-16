import { router } from "@server/trpc/trpc";
import { authRouter } from "@server/trpc/router/auth";
import { resultsRouter } from "@server/trpc/router/results";
import { groupsRouter } from "@server/trpc/router/group";
import { playoffsRouter } from "@server/trpc/router/playoffs";

export const appRouter = router({
  auth: authRouter,
  results: resultsRouter,
  groups: groupsRouter,
  playoffs: playoffsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
