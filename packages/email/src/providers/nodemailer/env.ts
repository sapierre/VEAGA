import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { sharedEnv } from "../../utils/env";

export const env = createEnv({
  ...envConfig,
  extends: [sharedEnv],
  server: {
    NODEMAILER_HOST: z.string(),
    NODEMAILER_PORT: z.coerce.number(),
    NODEMAILER_USER: z.string(),
    NODEMAILER_PASSWORD: z.string(),
  },
  runtimeEnv: process.env,
});
