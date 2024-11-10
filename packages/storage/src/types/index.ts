export const StorageProvider = {
  S3: "s3",
} as const;

export type StorageProvider =
  (typeof StorageProvider)[keyof typeof StorageProvider];
