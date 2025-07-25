/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  client: {
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string(),
    NEXT_PUBLIC_PLAUSIBLE_HOST: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_PLAUSIBLE_HOST: process.env.NEXT_PUBLIC_PLAUSIBLE_HOST,
  },
});
