import { env } from "./env";
import { strategies } from "./providers";

export const { Provider, track } =
  strategies[env.EXPO_PUBLIC_ANALYTICS_PROVIDER];

export * from "./hooks";
