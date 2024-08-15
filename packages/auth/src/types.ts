import { z } from "zod";

import type {
  CookieMethodsBrowser,
  CookieMethodsServer,
  CookieOptionsWithName,
} from "@supabase/ssr";
import type {
  SupabaseClientOptions as SupabaseClientOptionsType,
  EmailOtpType,
  User,
} from "@supabase/supabase-js";
import type { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

type AuthClientOptions = SupabaseClientOptionsType<"public"> & {
  cookieOptions?: CookieOptionsWithName;
};

type AuthBrowserClientOptions = AuthClientOptions & {
  cookies: CookieMethodsBrowser;
};

type AuthServerClientOptions = AuthClientOptions & {
  cookies: CookieMethodsServer;
};

interface AuthClientConfig {
  url: string;
  key: string;
}

type AuthClient = SupabaseAuthClient;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

const registerSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
  password: z
    .string({ required_error: "This field is required." })
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

const passwordLoginSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
  password: z
    .string({ required_error: "This field is required." })
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

const magicLinkLoginSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
});

type PasswordLoginData = z.infer<typeof passwordLoginSchema>;
type MagicLinkLoginData = z.infer<typeof magicLinkLoginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

const SOCIAL_PROVIDER = {
  GOOGLE: "google",
  TWITTER: "twitter",
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
  AuthClient,
  AuthClientConfig,
  AuthBrowserClientOptions,
  AuthServerClientOptions,
  EmailOtpType,
  PasswordLoginData,
  MagicLinkLoginData,
  RegisterData,
  User,
  AuthConfig,
};

export {
  authConfigSchema,
  registerSchema,
  passwordLoginSchema,
  magicLinkLoginSchema,
  PASSWORD_REGEX,
  SOCIAL_PROVIDER,
  AUTH_PROVIDER,
};
