/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  server: {
    DATABASE_URL: z.url(),
  },
  runtimeEnv: process.env,
});
