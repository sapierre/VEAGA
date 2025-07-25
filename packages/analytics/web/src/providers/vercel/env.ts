import { createEnv } from "@t3-oss/env-nextjs";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  client: {},
  experimental__runtimeEnv: {},
});
