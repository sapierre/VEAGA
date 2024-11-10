import { StorageProvider } from "../types";

import { s3Strategy } from "./s3";

import type { StorageProviderStrategy } from "./types";

export const strategies: Record<StorageProvider, StorageProviderStrategy> = {
  [StorageProvider.S3]: s3Strategy,
};
