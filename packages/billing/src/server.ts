import { provider } from "./env";
import { strategies } from "./providers";

export const { webhookHandler, checkout, getBillingPortal } =
  strategies[provider];

export { getCustomerByUserId } from "./lib/customer";
export * from "./lib/schema";
