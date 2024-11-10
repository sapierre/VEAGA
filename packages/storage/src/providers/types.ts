import type { GetUploadUrlInput } from "../lib/schema";

export interface StorageProviderStrategy {
  getUploadUrl: (data: GetUploadUrlInput) => Promise<{ url: string }>;
}
