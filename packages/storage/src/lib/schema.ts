import { z } from "zod";

export const getUploadUrlSchema = z.object({
  path: z.string(),
  bucket: z.string(),
});

export type GetUploadUrlInput = z.infer<typeof getUploadUrlSchema>;
