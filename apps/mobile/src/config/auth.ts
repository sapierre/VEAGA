import env from "env.config";

import { SocialProvider, authConfigSchema } from "@turbostarter/auth";

import type { AuthConfig } from "@turbostarter/auth";

export const authConfig = authConfigSchema.parse({
  providers: {
    password: env.EXPO_PUBLIC_AUTH_PASSWORD,
    magicLink: env.EXPO_PUBLIC_AUTH_MAGIC_LINK,
    anonymous: env.EXPO_PUBLIC_AUTH_ANONYMOUS,
    oAuth: [SocialProvider.GOOGLE, SocialProvider.GITHUB],
  },
}) satisfies AuthConfig;
