import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  getObjectUrlSchema,
  getUploadUrl,
  getSignedUrl,
  getPublicUrl,
  getDeleteUrl,
} from "@turbostarter/storage/server";

import { enforceAuth } from "../../middleware";

export const storageRouter = new Hono()
  .get(
    "/upload",
    enforceAuth,
    zValidator("query", getObjectUrlSchema),
    async (c) => c.json(await getUploadUrl(c.req.valid("query"))),
  )
  .get("/public", zValidator("query", getObjectUrlSchema), async (c) =>
    c.json(await getPublicUrl(c.req.valid("query"))),
  )
  .get(
    "/signed",
    enforceAuth,
    zValidator("query", getObjectUrlSchema),
    async (c) => c.json(await getSignedUrl(c.req.valid("query"))),
  )
  .get(
    "/delete",
    enforceAuth,
    zValidator("query", getObjectUrlSchema),
    async (c) => c.json(await getDeleteUrl(c.req.valid("query"))),
  );
