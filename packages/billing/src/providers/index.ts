import { BillingProvider } from "../types";

import { lemonSqueezyStrategy } from "./lemon-squeezy";
import { polarStrategy } from "./polar";
import { stripeStrategy } from "./stripe";

import type { BillingProviderStrategy } from "./types";

export const strategies: Record<BillingProvider, BillingProviderStrategy> = {
  [BillingProvider.STRIPE]: stripeStrategy,
  [BillingProvider.LEMON_SQUEEZY]: lemonSqueezyStrategy,
  [BillingProvider.POLAR]: polarStrategy,
};
