import { env } from "./env";
import { strategies } from "./providers";

export const { getUploadUrl } = strategies[env.STORAGE_PROVIDER];

export * from "./lib/schema";
