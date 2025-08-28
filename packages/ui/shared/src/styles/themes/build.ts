import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { themes } from ".";

import type { ColorVariable, ThemeColorsVariables } from "../../types";

const OUTPUT_PATH = "variables.css";

const hslToString = (h: number, s: number, l: number) =>
  `${h.toFixed(1).replace(".0", "")} ${(s * 100).toFixed(1).replace(".0", "")}% ${(l * 100).toFixed(1).replace(".0", "")}%`;

const generateCSSVariables = (theme: ThemeColorsVariables) =>
  Object.entries(theme)
    .map(
      ([key, value]: [string, ColorVariable]) =>
        `  --color-${key}: ${hslToString(...value)};`,
    )
    .join("\n");

const generateThemeCSS = () => {
  return Object.entries(themes)
    .map(
      ([themeName, { light, dark }]) => `
[data-theme="${themeName}"] {
${generateCSSVariables(light)}
}

.dark[data-theme="${themeName}"],
[data-theme="${themeName}"]:is(.dark *) {
${generateCSSVariables(dark)}
}`,
    )
    .join("")
    .trim();
};

const outputPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  `./${OUTPUT_PATH}`,
);

fs.writeFileSync(outputPath, generateThemeCSS(), "utf8");
console.log(`CSS file generated at: ${outputPath}`);
