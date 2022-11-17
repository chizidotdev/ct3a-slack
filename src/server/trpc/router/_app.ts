// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { teamRouter } from "./team";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
