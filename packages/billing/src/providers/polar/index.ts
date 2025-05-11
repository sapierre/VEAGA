import { checkout, getBillingPortal } from "./checkout";
import { webhookHandler } from "./webhook";

export const polarStrategy = {
  checkout,
  getBillingPortal,
  webhookHandler,
};
