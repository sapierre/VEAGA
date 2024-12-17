import { provider } from "./env";
import { strategies } from "./providers";

export const { track } = strategies[provider];
