import { env } from "../env";
import { strategies } from "../providers";
import { getCustomerByUserId } from "./customer";

const { webhookHandler, getPlans } = strategies[env.BILLING_PROVIDER];

export { webhookHandler, getPlans, getCustomerByUserId };

export * from "../config";
