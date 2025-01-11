import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { StorageProvider } from "../types";

const shared = {
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
} as const;

export const provider = z
  .nativeEnum(StorageProvider)
  .optional()
  .default(StorageProvider.S3)
  /* eslint-disable-next-line turbo/no-undeclared-env-vars */
  .parse(process.env.STORAGE_PROVIDER);

const getStorageEnv = () => {
  switch (provider) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case StorageProvider.S3:
      return createEnv({
        ...shared,
        server: {
          S3_BUCKET: z.string().optional(),
          S3_REGION: z.string().optional().default("us-east-1"),
          S3_ENDPOINT: z.string(),
          S3_ACCESS_KEY_ID: z.string(),
          S3_SECRET_ACCESS_KEY: z.string(),
          STORAGE_PROVIDER: z
            .literal(StorageProvider.S3)
            .optional()
            .default(StorageProvider.S3),
        },
      });
    default:
      throw new Error(`Unsupported storage provider!`);
  }
};

export const env = getStorageEnv();
