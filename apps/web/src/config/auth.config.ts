import {
  AuthConfig,
  SOCIAL_PROVIDER,
  authConfigSchema,
} from "@turbostarter/auth";

export const authConfig = authConfigSchema.parse({
  providers: {
    password: true,
    magicLink: true,
    oAuth: [
      SOCIAL_PROVIDER.GOOGLE,
      SOCIAL_PROVIDER.TWITTER,
      SOCIAL_PROVIDER.GITHUB,
    ],
  },
}) satisfies AuthConfig;
