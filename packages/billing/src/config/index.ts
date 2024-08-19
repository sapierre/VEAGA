import { env } from "../env";
import { billingConfigSchema } from "./schema";

export const config = billingConfigSchema.parse({
  provider: env.BILLING_PROVIDER,
  model: env.BILLING_MODEL,
});
