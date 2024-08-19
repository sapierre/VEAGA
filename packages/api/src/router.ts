import { createTRPCRouter } from "./trpc";
import { userRouter } from "./modules/user/user.router";
import { billingRouter } from "./modules/billing/billing.router";

export const appRouter = createTRPCRouter({
  user: userRouter,
  billing: billingRouter,
});

export type AppRouter = typeof appRouter;
