import type { Config } from "tailwindcss";

import baseConfig from "@turbostarter/tailwind-config/web";

export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  presets: [baseConfig],
} satisfies Config;
