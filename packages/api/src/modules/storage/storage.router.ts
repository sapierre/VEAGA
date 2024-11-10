import { getUploadUrlSchema, getUploadUrl } from "@turbostarter/storage/server";

import { createTRPCRouter, publicProcedure } from "../../trpc";

export const storageRouter = createTRPCRouter({
  getUploadUrl: publicProcedure
    .input(getUploadUrlSchema)
    .mutation(async ({ input }) => getUploadUrl(input)),
});
