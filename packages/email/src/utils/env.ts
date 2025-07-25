import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const sharedEnv = createEnv({
  ...envConfig,
  server: {
    EMAIL_FROM: z.string().email(),
  },
  runtimeEnv: process.env,
});
