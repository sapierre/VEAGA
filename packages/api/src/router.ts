import { aiRouter } from "./modules/ai/ai.router";
import { billingRouter } from "./modules/billing/billing.router";
import { userRouter } from "./modules/user/user.router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  billing: billingRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
