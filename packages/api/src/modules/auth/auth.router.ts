import { Hono } from "hono";

import { auth } from "@turbostarter/auth/server";

export const authRouter = new Hono().on(["GET", "POST"], "**", async (c) =>
  auth.handler(c.req.raw),
);
