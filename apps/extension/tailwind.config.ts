import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@turbostarter/tailwind-config/mobile";

export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...fontFamily.sans],
        mono: ["DM Mono", ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
