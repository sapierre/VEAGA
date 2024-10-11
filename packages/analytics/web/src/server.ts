import { env } from "./env";
import { serverStrategies } from "./providers/server";

export const { track } = serverStrategies[env.NEXT_PUBLIC_ANALYTICS_PROVIDER];
