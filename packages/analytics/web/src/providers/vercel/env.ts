import { defineEnv } from "envin";

import { envConfig } from "@turbostarter/shared/constants";

import type { Preset } from "envin/types";

export const preset = {
  id: "vercel",
  server: {},
} as const satisfies Preset;

export const env = defineEnv({
  ...envConfig,
  ...preset,
});
