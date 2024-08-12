import baseConfig, { restrictEnvAccess } from "@turbostarter/eslint-config/base";
import nextjsConfig from "@turbostarter/eslint-config/nextjs";
import reactConfig from "@turbostarter/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
