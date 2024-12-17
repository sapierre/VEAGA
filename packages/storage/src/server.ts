import { provider } from "./env";
import { strategies } from "./providers";

export const { getUploadUrl } = strategies[provider];

export * from "./lib/schema";
