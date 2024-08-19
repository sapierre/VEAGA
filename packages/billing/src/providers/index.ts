import { BillingProvider } from "../types";
import { stripeStrategy } from "./stripe";
import { BillingProviderStrategy } from "./types";

export const strategies: Record<BillingProvider, BillingProviderStrategy> = {
  [BillingProvider.STRIPE]: stripeStrategy,
};
