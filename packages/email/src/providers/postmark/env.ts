import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { sharedEnv } from "../../utils/env";

export const env = createEnv({
  ...envConfig,
  extends: [sharedEnv],
  server: {
    POSTMARK_API_KEY: z.string(),
  },
  runtimeEnv: process.env,
});
