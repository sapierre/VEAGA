import { getPlans } from "./subscription";
import { webhookHandler } from "./webhook";

export const stripeStrategy = {
  webhookHandler,
  getPlans,
};
