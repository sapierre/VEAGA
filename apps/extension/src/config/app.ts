import { env } from "~/lib/env";

export const appConfig = {
  theme: {
    mode: env.PLASMO_PUBLIC_THEME_MODE,
    color: env.PLASMO_PUBLIC_THEME_COLOR,
  },
} as const;
