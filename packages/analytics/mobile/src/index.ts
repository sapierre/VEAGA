import { provider } from "./env";
import { strategies } from "./providers";

export const { Provider, track } = strategies[provider];

export * from "./hooks";
