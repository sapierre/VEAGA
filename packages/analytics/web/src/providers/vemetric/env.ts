/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  client: {
    NEXT_PUBLIC_VEMETRIC_PROJECT_TOKEN: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VEMETRIC_PROJECT_TOKEN:
      process.env.NEXT_PUBLIC_VEMETRIC_PROJECT_TOKEN,
  },
});
