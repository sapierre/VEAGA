/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { Locale } from "../types";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string().optional().default(Locale.EN),
  },
  server: {
    DEFAULT_LOCALE: z.string().optional(),
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: {
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  },
  emptyStringAsUndefined: true,
});
