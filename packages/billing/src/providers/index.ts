import { BillingProvider } from "../types";

import { stripeStrategy } from "./stripe";

import type { BillingProviderStrategy } from "./types";

export const strategies: Record<BillingProvider, BillingProviderStrategy> = {
  [BillingProvider.STRIPE]: stripeStrategy,
};
