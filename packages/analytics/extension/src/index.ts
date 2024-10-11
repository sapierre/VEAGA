import { env } from "./env";
import { strategies } from "./providers";

export const { track } = strategies[env.PLASMO_PUBLIC_ANALYTICS_PROVIDER];
