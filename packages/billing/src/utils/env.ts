import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { BillingModel } from "../types";

export const sharedEnv = createEnv({
  ...envConfig,
  server: {
    BILLING_MODEL: z
      .nativeEnum(BillingModel)
      .optional()
      .default(BillingModel.RECURRING),
  },
  runtimeEnv: process.env,
});
