import type { ConfigContext, ExpoConfig } from "expo/config";

const SPLASH = {
  imageWidth: 150,
  image: "./public/images/splash/splash.png",
  dark: {
    image: "./public/images/splash/splash.png",
    backgroundColor: "#0D121C",
  },
} as const;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "TurboStarter",
  slug: "turbostarter",
  scheme: "turbostarter",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./public/images/icon/ios.png",
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
  },
  android: {
    package: "your.bundle.identifier",
    adaptiveIcon: {
      monochromeImage: "./public/images/icon/android/monochrome.png",
      foregroundImage: "./public/images/icon/android/adaptive.png",
      backgroundColor: "#0D121C",
    },
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
    "expo-build-properties",
    "expo-image-picker",
    /* required to enable i18n */
    "expo-localization",
    [
      "expo-tracking-transparency",
      {
        /* 🍎 Describe why you need access to the user's data */
        userTrackingPermission:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
    ["expo-splash-screen", SPLASH],
  ],
});
