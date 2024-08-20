import { checkout, getBillingPortal } from "./checkout";
import { getPlans } from "./subscription";
import { webhookHandler } from "./webhook";

export const stripeStrategy = {
  webhookHandler,
  checkout,
  getPlans,
  getBillingPortal,
};
