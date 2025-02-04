import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";

import * as schema from "@turbostarter/db/schema";
import { db } from "@turbostarter/db/server";
import { EmailTemplate } from "@turbostarter/email";
import { sendEmail } from "@turbostarter/email/server";
import { getLocaleFromRequest } from "@turbostarter/i18n/server";

import { env } from "./env";
import { SOCIAL_PROVIDER } from "./types";

export const auth = betterAuth({
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }, request) =>
        sendEmail({
          to: user.email,
          template: EmailTemplate.DELETE_ACCOUNT,
          locale: getLocaleFromRequest(request),
          variables: {
            url: url,
          },
        }),
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }, request) =>
        sendEmail({
          to: newEmail,
          template: EmailTemplate.CHANGE_EMAIL,
          locale: getLocaleFromRequest(request),
          variables: {
            url,
          },
        }),
    },
  },
  trustedOrigins: ["chrome-extension://", "turbostarter://"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, request) =>
      sendEmail({
        to: user.email,
        template: EmailTemplate.RESET_PASSWORD,
        locale: getLocaleFromRequest(request),
        variables: {
          url,
        },
      }),
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }, request) =>
      sendEmail({
        to: user.email,
        template: EmailTemplate.CONFIRM_EMAIL,
        locale: getLocaleFromRequest(request),
        variables: {
          url,
        },
      }),
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }, request) =>
        sendEmail({
          to: email,
          template: EmailTemplate.MAGIC_LINK,
          locale: getLocaleFromRequest(request),
          variables: {
            url,
          },
        }),
    }),
    expo(),
    nextCookies(),
  ],
  socialProviders: {
    [SOCIAL_PROVIDER.GITHUB]: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    [SOCIAL_PROVIDER.GOOGLE]: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    cookiePrefix: "turbostarter",
  },
});

export type AuthErrorCode = keyof typeof auth.$ERROR_CODES;
