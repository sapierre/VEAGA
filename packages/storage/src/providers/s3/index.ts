import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getClient } from "./client";

import type { GetUploadUrlInput } from "../../lib/schema";
import type { StorageProviderStrategy } from "../types";

const getUploadUrl = async ({ path, bucket }: GetUploadUrlInput) => {
  const client = getClient();

  const url = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: bucket,
      Key: path,
    }),
    {
      expiresIn: 60,
    },
  );

  return { url };
};

export const s3Strategy: StorageProviderStrategy = {
  getUploadUrl,
};
