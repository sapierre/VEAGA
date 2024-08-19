import { getPlans, config } from "@turbostarter/billing/api";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const billingRouter = createTRPCRouter({
  getPlans: publicProcedure.query(async () => ({
    plans: await getPlans(),
    config,
  })),
});
