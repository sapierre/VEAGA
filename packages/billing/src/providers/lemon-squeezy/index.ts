import { env } from "../../env";
import { BillingProvider } from "../../types";

import { checkout, getBillingPortal } from "./checkout";
import { setup } from "./client";
import { webhookHandler } from "./webhook";

if (env.BILLING_PROVIDER === BillingProvider.LEMON_SQUEEZY) {
  setup();
}

export const lemonSqueezyStrategy = {
  webhookHandler,
  checkout,
  getBillingPortal,
};
