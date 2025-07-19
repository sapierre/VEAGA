import { z } from "zod";

import type { AuthErrorCode } from "./server";
import type { expoClient } from "@better-auth/expo/client";
import type { TranslationKey } from "@turbostarter/i18n";
import type {
  User,
  Session,
  ClientOptions,
  BetterAuthClientPlugin,
} from "better-auth";

type AuthMobileClientOptions = Parameters<typeof expoClient>[0];

const SocialProvider = {
  GOOGLE: "google",
  GITHUB: "github",
} as const;

type SocialProvider = (typeof SocialProvider)[keyof typeof SocialProvider];

const AuthProvider = {
  ...SocialProvider,
  PASSWORD: "password",
  MAGIC_LINK: "magicLink",
  ANONYMOUS: "anonymous",
  PASSKEY: "passkey",
} as const;

type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

const SecondFactor = {
  TOTP: "totp",
  BACKUP_CODE: "backupCode",
} as const;

type SecondFactor = (typeof SecondFactor)[keyof typeof SecondFactor];

const authConfigSchema = z.object({
  providers: z.object({
    [AuthProvider.PASSWORD]: z.boolean(),
    [AuthProvider.MAGIC_LINK]: z.boolean(),
    [AuthProvider.ANONYMOUS]: z.boolean(),
    [AuthProvider.PASSKEY]: z.boolean().optional(),
    oAuth: z.array(z.nativeEnum(SocialProvider)),
  }),
});

type AuthConfig = z.infer<typeof authConfigSchema>;

const ERROR_MESSAGES: Record<AuthErrorCode, TranslationKey> = {
  USER_NOT_FOUND: "auth:error.user.notFound",
  USER_ALREADY_HAS_PASSWORD: "auth:error.user.alreadyHasPassword",
  AUTHENTICATION_FAILED: "auth:error.authenticationFailed",
  FAILED_TO_CREATE_USER: "auth:error.account.creation",
  FAILED_TO_CREATE_SESSION: "auth:error.session.creation",
  UNABLE_TO_CREATE_SESSION: "auth:error.session.creation",
  COULD_NOT_CREATE_SESSION: "auth:error.session.creation",
  FAILED_TO_UPDATE_USER: "auth:error.account.update",
  FAILED_TO_GET_SESSION: "auth:error.session.retrieval",
  INVALID_PASSWORD: "auth:error.credentials.password.invalid",
  INVALID_EMAIL: "auth:error.credentials.email.invalid",
  INVALID_EMAIL_OR_PASSWORD: "auth:error.credentials.invalidEmailOrPassword",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "auth:error.social.alreadyLinked",
  PROVIDER_NOT_FOUND: "auth:error.social.providerNotFound",
  INVALID_TOKEN: "auth:error.token.invalid",
  ID_TOKEN_NOT_SUPPORTED: "auth:error.token.idNotSupported",
  FAILED_TO_GET_USER_INFO: "auth:error.user.infoNotFound",
  USER_EMAIL_NOT_FOUND: "auth:error.user.emailNotFound",
  EMAIL_NOT_VERIFIED: "auth:error.credentials.email.notVerified",
  PASSWORD_TOO_SHORT: "auth:error.credentials.password.tooShort",
  PASSWORD_TOO_LONG: "auth:error.credentials.password.tooLong",
  USER_ALREADY_EXISTS: "auth:error.user.alreadyExists",
  EMAIL_CAN_NOT_BE_UPDATED: "auth:error.credentials.email.cannotUpdate",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "auth:error.credentials.notFound",
  SESSION_EXPIRED: "auth:error.session.expired",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "auth:error.social.unlinkLastAccount",
  ACCOUNT_NOT_FOUND: "auth:error.user.accountNotFound",
  CHALLENGE_NOT_FOUND: "auth:error.passkey.challengeNotFound",
  YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY: "auth:error.passkey.notAllowed",
  FAILED_TO_VERIFY_REGISTRATION: "auth:error.passkey.verificationFailed",
  PASSKEY_NOT_FOUND: "auth:error.passkey.notFound",
  FAILED_TO_UPDATE_PASSKEY: "auth:error.passkey.updateFailed",
  ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY:
    "auth:error.anonymous.cannotSignInAgain",
  OTP_NOT_ENABLED: "auth:error.otp.notEnabled",
  OTP_HAS_EXPIRED: "auth:error.otp.expired",
  TOTP_NOT_ENABLED: "auth:error.totp.notEnabled",
  TWO_FACTOR_NOT_ENABLED: "auth:error.twoFactor.notEnabled",
  BACKUP_CODES_NOT_ENABLED: "auth:error.backupCodes.notEnabled",
  INVALID_BACKUP_CODE: "auth:error.code.invalid",
  INVALID_CODE: "auth:error.code.invalid",
  TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "auth:error.code.tooManyAttempts",
  INVALID_TWO_FACTOR_COOKIE: "auth:error.twoFactor.invalidCookie",
} as const;

export type {
  ClientOptions as AuthClientOptions,
  BetterAuthClientPlugin as AuthClientPlugin,
  AuthMobileClientOptions,
  User,
  AuthConfig,
  Session,
  AuthErrorCode,
};

export {
  authConfigSchema,
  SocialProvider,
  AuthProvider,
  SecondFactor,
  ERROR_MESSAGES,
};
