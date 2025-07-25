import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { sharedEnv } from "../../utils/env";

export const env = createEnv({
  ...envConfig,
  extends: [sharedEnv],
  server: {
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  },
  runtimeEnv: process.env,
});
