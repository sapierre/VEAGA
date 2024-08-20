import { env } from "../env";
import { strategies } from "../providers";

import { getCustomerByUserId } from "./customer";

const { webhookHandler, getPlans, checkout, getBillingPortal } =
  strategies[env.BILLING_PROVIDER];

export {
  webhookHandler,
  getPlans,
  getCustomerByUserId,
  checkout,
  getBillingPortal,
};

export * from "../config";
export * from "./schema";
