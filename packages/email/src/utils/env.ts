import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const sharedEnv = createEnv({
  ...envConfig,
  server: {
    EMAIL_FROM: z.email(),
  },
  runtimeEnv: process.env,
});
