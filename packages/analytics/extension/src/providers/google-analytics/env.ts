/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  clientPrefix: "VITE_",
  client: {
    VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID: z.string(),
    VITE_GOOGLE_ANALYTICS_SECRET: z.string(),
  },
  runtimeEnv: {
    VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID: import.meta.env
      .VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID,
    VITE_GOOGLE_ANALYTICS_SECRET: import.meta.env.VITE_GOOGLE_ANALYTICS_SECRET,
  },
  skipValidation:
    (!!import.meta.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(import.meta.env.SKIP_ENV_VALIDATION)) ||
    ["lint", "postinstall"].includes(import.meta.env.npm_lifecycle_event),
});
