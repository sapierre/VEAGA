import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { env as billingEnv } from "@turbostarter/billing/env";
import { env as dbEnv } from "@turbostarter/db/env";
import { env as emailEnv } from "@turbostarter/email/env";
import { env as storageEnv } from "@turbostarter/storage/env";

export const env = createEnv({
  extends: [billingEnv, dbEnv, emailEnv, storageEnv],
  runtimeEnv: process.env,
  server: {
    OPENAI_API_KEY: z.string().optional(), // change it to your provider API key (e.g. ANTHROPIC_API_KEY if you use Anthropic)
  },
});
