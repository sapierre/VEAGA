import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { config } from "../config";
import { BillingProvider } from "../types";

const shared = {
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
} as const;

const getBillingEnv = (provider: BillingProvider) => {
  switch (provider) {
    case BillingProvider.LEMON_SQUEEZY:
      return createEnv({
        ...shared,
        server: {
          LEMON_SQUEEZY_API_KEY: z.string(),
          LEMON_SQUEEZY_SIGNING_SECRET: z.string(),
          LEMON_SQUEEZY_STORE_ID: z.string(),
          BILLING_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    case BillingProvider.STRIPE:
      return createEnv({
        ...shared,
        server: {
          STRIPE_SECRET_KEY: z.string(),
          STRIPE_WEBHOOK_SECRET: z.string(),
          BILLING_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    default:
      throw new Error(`Unsupported billing provider!`);
  }
};

export const env = getBillingEnv(config.provider);
