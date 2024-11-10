import { env } from "./env";
import { strategies } from "./providers";

export const { webhookHandler, checkout, getBillingPortal } =
  strategies[env.BILLING_PROVIDER];

export { getCustomerByUserId } from "./lib/customer";
export * from "./lib/schema";
