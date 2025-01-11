import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { onApiError } from "@turbostarter/shared/utils";

import { timing } from "./middleware";
import { aiRouter } from "./modules/ai/ai.router";
import { authRouter } from "./modules/auth/auth.router";
import { billingRouter } from "./modules/billing/billing.router";
import { storageRouter } from "./modules/storage/storage.router";

const appRouter = new Hono()
  .basePath("/api")
  .use(logger())
  .use(
    cors({
      origin: "*",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .use(timing)
  .route("/ai", aiRouter)
  .route("/auth", authRouter)
  .route("/billing", billingRouter)
  .route("/storage", storageRouter)
  .onError((err, c) => onApiError(err, c.req.raw));

type AppRouter = typeof appRouter;

export type { AppRouter };
export { appRouter };
