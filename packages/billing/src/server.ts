import { env } from "./env";
import { getCustomerByUserId } from "./lib/customer";
import { strategies } from "./providers";

const { webhookHandler, checkout, getBillingPortal } =
  strategies[env.BILLING_PROVIDER];

export { webhookHandler, getCustomerByUserId, checkout, getBillingPortal };

export * from "./lib/schema";
