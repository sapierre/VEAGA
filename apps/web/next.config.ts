import type { NextConfig } from "next";

import { env } from "./src/lib/env";

const INTERNAL_PACKAGES = [
  "@turbostarter/analytics-web",
  "@turbostarter/api",
  "@turbostarter/auth",
  "@turbostarter/billing",
  "@turbostarter/cms",
  "@turbostarter/db",
  "@turbostarter/shared",
  "@turbostarter/i18n",
  "@turbostarter/ui",
  "@turbostarter/ui-web",
];

const config: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  experimental: {
    optimizePackageImports: INTERNAL_PACKAGES,
  },

  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: INTERNAL_PACKAGES,

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: env.ANALYZE,
});

export default withBundleAnalyzer(config);
