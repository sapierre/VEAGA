/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID: z.string(),
  },
  server: {
    GOOGLE_ANALYTICS_SECRET: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
  },
});
