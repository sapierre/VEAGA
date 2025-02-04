import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { env as billingEnv } from "@turbostarter/billing/env";
import { env as dbEnv } from "@turbostarter/db/env";
import { env as emailEnv } from "@turbostarter/email/env";
import { env as storageEnv } from "@turbostarter/storage/env";

export const env = createEnv({
  extends: [billingEnv, dbEnv, emailEnv, storageEnv],
  server: {
    OPENAI_API_KEY: z.string().optional(), // change it to your provider API key (e.g. ANTHROPIC_API_KEY if you use Anthropic)
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
