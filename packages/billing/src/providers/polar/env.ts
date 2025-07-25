import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { sharedEnv } from "../../utils/env";

export const env = createEnv({
  ...envConfig,
  extends: [sharedEnv],
  server: {
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_WEBHOOK_SECRET: z.string(),
    POLAR_ORGANIZATION_SLUG: z.string().optional(),
  },
  runtimeEnv: process.env,
});
