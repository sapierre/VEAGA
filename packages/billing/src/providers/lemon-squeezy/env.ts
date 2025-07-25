import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { sharedEnv } from "../../utils/env";

export const env = createEnv({
  ...envConfig,
  extends: [sharedEnv],
  server: {
    LEMON_SQUEEZY_API_KEY: z.string(),
    LEMON_SQUEEZY_SIGNING_SECRET: z.string(),
    LEMON_SQUEEZY_STORE_ID: z.string(),
  },
  runtimeEnv: process.env,
});
