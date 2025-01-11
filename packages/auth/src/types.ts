import { z } from "zod";

import type { expoClient } from "@better-auth/expo/client";
import type { User, Session } from "better-auth";
import type { ClientOptions, BetterAuthClientPlugin } from "better-auth";

type AuthMobileClientOptions = Parameters<typeof expoClient>[0];

const SOCIAL_PROVIDER = {
  GOOGLE: "google",
  GITHUB: "github",
} as const;

type SOCIAL_PROVIDER = (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];

const AUTH_PROVIDER = {
  ...SOCIAL_PROVIDER,
  PASSWORD: "password",
  MAGIC_LINK: "magicLink",
} as const;

type AUTH_PROVIDER = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];

const authConfigSchema = z.object({
  providers: z.object({
    [AUTH_PROVIDER.PASSWORD]: z.boolean(),
    [AUTH_PROVIDER.MAGIC_LINK]: z.boolean(),
    oAuth: z.array(z.nativeEnum(SOCIAL_PROVIDER)),
  }),
});

type AuthConfig = z.infer<typeof authConfigSchema>;

export type {
  ClientOptions as AuthClientOptions,
  BetterAuthClientPlugin as AuthClientPlugin,
  AuthMobileClientOptions,
  User,
  AuthConfig,
  Session,
};

export { authConfigSchema, SOCIAL_PROVIDER, AUTH_PROVIDER };
