import type { CheckoutInput, GetBillingPortalInput } from "../api/schema";
import type { PricingPlanWithPrices } from "../types";
import type { User } from "@turbostarter/auth";

export interface BillingProviderStrategy {
  webhookHandler: (req: Request) => Promise<Response>;
  getPlans: () => Promise<PricingPlanWithPrices[]>;
  checkout: (
    input: CheckoutInput & { user: User },
  ) => Promise<{ url: string | null }>;
  getBillingPortal: (
    input: GetBillingPortalInput & { user: User },
  ) => Promise<{ url: string }>;
}
