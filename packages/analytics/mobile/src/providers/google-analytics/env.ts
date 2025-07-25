import { createEnv } from "@t3-oss/env-core";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  clientPrefix: "EXPO_PUBLIC_",
  client: {},
  runtimeEnv: process.env,
});
