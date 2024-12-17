import { env } from "~/lib/env";

export const appConfig = {
  theme: {
    mode: env.VITE_THEME_MODE,
    color: env.VITE_THEME_COLOR,
  },
} as const;
