import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@turbostarter/tailwind-config/web";

import { themes } from "@turbostarter/ui";
import { hslToRgb, mapValues, transform } from "@turbostarter/shared/utils";

export default {
  // We need to append the path to the UI packages to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../packages/ui/{shared,web}/src/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...fontFamily.sans],
        mono: ["DM Mono", ...fontFamily.mono],
      },
      variables: transform(themes, (r, v, k) => {
        r[`[data-theme=${k}]`] = {
          colors: mapValues(v.light, (v) => `rgb(${hslToRgb(...v).join(",")})`),
        };
      }),
      darkVariables: transform(themes, (r, v, k) => {
        r[`[data-theme=${k}]`] = {
          colors: mapValues(v.dark, (v) => `rgb(${hslToRgb(...v).join(",")})`),
        };
      }),
    },
  },
} satisfies Config;
