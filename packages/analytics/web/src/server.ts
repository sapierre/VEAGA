import { provider } from "./env";
import { serverStrategies } from "./providers/server";

export const { track } = serverStrategies[provider];
