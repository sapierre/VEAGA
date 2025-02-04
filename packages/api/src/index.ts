import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";

import { localize, timing } from "./middleware";
import { aiRouter } from "./modules/ai/ai.router";
import { authRouter } from "./modules/auth/auth.router";
import { billingRouter } from "./modules/billing/billing.router";
import { storageRouter } from "./modules/storage/storage.router";
import { onError } from "./utils/on-error";

const appRouter = new Hono()
  .basePath("/api")
  .use(logger())
  .use(csrf())
  .use(
    cors({
      origin: "*" /* set to your app url in production */,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .use(timing)
  .use(localize)
  .route("/ai", aiRouter)
  .route("/auth", authRouter)
  .route("/billing", billingRouter)
  .route("/storage", storageRouter)
  .onError(onError);

type AppRouter = typeof appRouter;

export type { AppRouter };
export { appRouter };
