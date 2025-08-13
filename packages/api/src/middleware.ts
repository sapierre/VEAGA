import { zValidator } from "@hono/zod-validator";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";

import { auth } from "@turbostarter/auth/server";
import { makeZodI18nMap } from "@turbostarter/i18n";
import {
  getLocaleFromRequest,
  getTranslation,
} from "@turbostarter/i18n/server";
import { HttpStatusCode, NodeEnv } from "@turbostarter/shared/constants";
import { HttpException } from "@turbostarter/shared/utils";

import type { User } from "@turbostarter/auth";
import type { TFunction } from "@turbostarter/i18n";
import type { Context, ValidationTargets } from "hono";
import type { $ZodRawIssue, $ZodType } from "zod/v4/core";

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
export const enforceAuth = createMiddleware<{
  Variables: {
    user: User;
  };
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  const user = session?.user ?? null;

  if (!user) {
    throw new HttpException(HttpStatusCode.UNAUTHORIZED, {
      code: "auth:error.unauthorized",
    });
  }

  c.set("user", user);
  await next();
});

/**
 * Middleware for adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
export const timing = createMiddleware<{
  Bindings: {
    NODE_ENV: string;
  };
}>(async (c, next) => {
  if (env(c).NODE_ENV === NodeEnv.DEVELOPMENT) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  await next();
});

/**
 * Middleware for setting the language based on the cookie and accept-language header.
 */
export const localize = createMiddleware<{
  Variables: {
    locale: string;
  };
}>(async (c, next) => {
  const locale = getLocaleFromRequest(c.req.raw);
  c.set("locale", locale);
  await next();
});

/**
 * Middleware for validating the request input using Zod.
 */
export const validate = <
  T extends $ZodType,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T,
) =>
  zValidator(
    target,
    schema,
    async (result, c: Context<{ Variables: { locale?: string } }>) => {
      if (!result.success) {
        const { t } = await getTranslation({
          locale: c.var.locale,
        });
        const error = result.error.issues[0];

        if (!error) {
          throw new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY);
        }

        const { message, code } = makeZodI18nMap({ t: t as TFunction })(
          error as $ZodRawIssue,
        );

        throw new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
          code,
          message,
        });
      }
    },
  );
