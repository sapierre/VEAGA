import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@turbostarter/tailwind-config/mobile";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
} satisfies Config;
