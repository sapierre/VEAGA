import { z } from "zod";

import { env } from "../env";

export const getObjectUrlSchema = z.object({
  path: z.string(),
  bucket: env.S3_BUCKET
    ? z.string().optional().default(env.S3_BUCKET)
    : z.string(),
});

export type GetObjectUrlInput = z.input<typeof getObjectUrlSchema>;
