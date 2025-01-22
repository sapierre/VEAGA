import Constants from "expo-constants";

import { env } from "~/lib/env";

export const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    console.warn("Failed to get localhost. Pointing to production server...");
    return env.EXPO_PUBLIC_SITE_URL;
  }
  return `http://${localhost}:3000`;
};
