import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { BillingModel, BillingProvider } from "../types";

const shared = {
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
} as const;

const BILLING_PROVIDER = z
  .nativeEnum(BillingProvider)
  .optional()
  .default(BillingProvider.STRIPE)
  /* eslint-disable-next-line turbo/no-undeclared-env-vars */
  .parse(process.env.BILLING_PROVIDER);

const configEnv = createEnv({
  ...shared,
  server: {
    BILLING_MODEL: z
      .nativeEnum(BillingModel)
      .optional()
      .default(BillingModel.RECURRING),
  },
});

const getBillingEnv = (provider: BillingProvider) => {
  switch (provider) {
    case BillingProvider.LEMON_SQUEEZY:
      return createEnv({
        ...shared,
        extends: [configEnv],
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
        extends: [configEnv],
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

export const env = getBillingEnv(BILLING_PROVIDER);
