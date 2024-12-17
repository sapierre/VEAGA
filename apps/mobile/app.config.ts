import type { ConfigContext, ExpoConfig } from "expo/config";

const APP_NAME = "TurboStarter";
const SLUG = "turbostarter";

const SPLASH = {
  image: "./public/images/splash/light.png",
  resizeMode: "cover",
  backgroundColor: "#ffffff",
  dark: {
    image: "./public/images/splash/dark.png",
    resizeMode: "cover",
    backgroundColor: "#0D121C",
  },
} as const;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: SLUG,
  scheme: SLUG,
  version: "0.1.0",
  orientation: "portrait",
  icon: "./public/images/icon.png",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  platforms: ["ios", "android"],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  newArchEnabled: true,
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: false,
    splash: SPLASH,
  },
  android: {
    package: "your.bundle.identifier",
    splash: SPLASH,
  },
  extra: {
    eas: {
      projectId: "",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
    reactCanary: true,
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-secure-store",
    [
      "expo-tracking-transparency",
      {
        /* 🍎 Describe why you need access to the user's data */
        userTrackingPermission:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
  ],
});
