import { defineEnv } from "envin";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import { sharedPreset } from "../../utils/env";

import type { Preset } from "envin/types";

export const preset = {
  id: "plunk",
  server: {
    PLUNK_API_KEY: z.string(),
  },
  extends: [sharedPreset],
} as const satisfies Preset;

export const env = defineEnv({
  ...envConfig,
  ...preset,
});
