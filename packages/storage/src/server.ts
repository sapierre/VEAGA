import { provider } from "./env";
import { strategies } from "./providers";

export const { getUploadUrl, getDeleteUrl, getPublicUrl, getSignedUrl } =
  strategies[provider];

export * from "./lib/schema";
