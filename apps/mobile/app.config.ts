import type { ConfigContext, ExpoConfig } from "expo/config";
import slugify from "slugify";

const APP_NAME = "TurboStarter";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: slugify(APP_NAME, { lower: true }),
  scheme: "com.supabase",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  sdkVersion: "51.0.0",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0D121C",
  },

  platforms: ["ios", "android"],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: true,
  },
  android: {
    package: "your.bundle.identifier",
  },
  extra: {
    eas: {
      projectId: "a7958179-7450-4e6f-8791-da222215909e",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router"],
});
