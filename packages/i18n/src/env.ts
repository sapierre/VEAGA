/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { Locale } from "./types";

export const env = createEnv({
  ...envConfig,
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string().optional().default(Locale.EN),
  },
  server: {
    DEFAULT_LOCALE: z.string().optional(),
  },
  runtimeEnv: {
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  },
});
