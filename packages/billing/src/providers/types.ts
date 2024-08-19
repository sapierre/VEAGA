import { PricingPlanWithPrices } from "../types";

export type BillingProviderStrategy = {
  webhookHandler: (req: Request) => Promise<Response>;
  getPlans: () => Promise<PricingPlanWithPrices[]>;
};
