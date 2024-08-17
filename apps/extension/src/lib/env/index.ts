/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { NODE_ENV } from "@turbostarter/shared/constants";

console.log(process.env);

export const env = createEnv({
  shared: {
    NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),
  },
  clientPrefix: "PLASMO_PUBLIC_",
  client: {
    PLASMO_PUBLIC_AUTH_COOKIE_NAME: z.string(),
  },
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
