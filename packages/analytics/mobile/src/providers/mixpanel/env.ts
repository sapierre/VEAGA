/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_MIXPANEL_TOKEN: z.string(),
  },
  runtimeEnv: {
    EXPO_PUBLIC_MIXPANEL_TOKEN: process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
  },
});
