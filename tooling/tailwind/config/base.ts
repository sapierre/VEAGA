import variables from "@mertasan/tailwindcss-variables";
import colorVariable from "@mertasan/tailwindcss-variables/colorVariable";
import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

import type { Config } from "tailwindcss";
import type { PluginsConfig } from "tailwindcss/types/config";

export default {
  darkMode: ["class", ".dark"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: colorVariable("--colors-border", true),
        input: colorVariable("--colors-input", true),
        ring: colorVariable("--colors-ring", true),
        background: colorVariable("--colors-background", true),
        foreground: colorVariable("--colors-foreground", true),
        primary: {
          DEFAULT: colorVariable("--colors-primary", true),
          foreground: colorVariable("--colors-primary-foreground", true),
        },
        secondary: {
          DEFAULT: colorVariable("--colors-secondary", true),
          foreground: colorVariable("--colors-secondary-foreground", true),
        },
        success: {
          DEFAULT: colorVariable("--colors-success", true),
          foreground: colorVariable("--colors-success-foreground", true),
        },
        destructive: {
          DEFAULT: colorVariable("--colors-destructive", true),
          foreground: colorVariable("--colors-destructive-foreground", true),
        },
        muted: {
          DEFAULT: colorVariable("--colors-muted", true),
          foreground: colorVariable("--colors-muted-foreground", true),
        },
        accent: {
          DEFAULT: colorVariable("--colors-accent", true),
          foreground: colorVariable("--colors-accent-foreground", true),
        },
        popover: {
          DEFAULT: colorVariable("--colors-popover", true),
          foreground: colorVariable("--colors-popover-foreground", true),
        },
        card: {
          DEFAULT: colorVariable("--colors-card", true),
          foreground: colorVariable("--colors-card-foreground", true),
        },
      },
      borderColor: {
        DEFAULT: colorVariable("--colors-border", true),
      },
    },
  },
  plugins: [
    animate,
    containerQueries,
    typography,
    variables({
      colorVariables: true,
      forceRGB: true,
      darkToRoot: false,
    }),
  ] as Partial<PluginsConfig>,
} satisfies Config;
