import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { BillingModel, BillingProvider } from "../types";

const shared = {
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
};

const baseEnv = createEnv({
  ...shared,
  server: {
    BILLING_PROVIDER: z.nativeEnum(BillingProvider),
    BILLING_MODEL: z.nativeEnum(BillingModel),
  },
});

const providersEnv = {
  [BillingProvider.STRIPE]: createEnv({
    ...shared,
    extends: [baseEnv],
    server: {
      BILLING_PROVIDER: z.literal(BillingProvider.STRIPE),
      STRIPE_SECRET_KEY: z.string(),
      STRIPE_WEBHOOK_SECRET: z.string(),
    },
  }),
} as const;

export const env = providersEnv[baseEnv.BILLING_PROVIDER];
