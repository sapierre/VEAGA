import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { config } from "../config";
import { BillingProvider } from "../types";

const shared = {
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
};

const getProviderEnv = (provider: BillingProvider) => {
  if (provider === BillingProvider.LEMON_SQUEEZY) {
    return {
      BILLING_PROVIDER: provider,
      ...createEnv({
        ...shared,
        server: {
          LEMON_SQUEEZY_API_KEY: z.string(),
          LEMON_SQUEEZY_SIGNING_SECRET: z.string(),
          LEMON_SQUEEZY_STORE_ID: z.string(),
        },
      }),
    };
  }

  // defaults to stripe
  return {
    BILLING_PROVIDER: provider,
    ...createEnv({
      ...shared,
      server: {
        STRIPE_SECRET_KEY: z.string(),
        STRIPE_WEBHOOK_SECRET: z.string(),
      },
    }),
  };
};

export const env = getProviderEnv(config.provider);
