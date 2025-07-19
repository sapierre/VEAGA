import { expoClient } from "@better-auth/expo/client";
import {
  magicLinkClient,
  twoFactorClient,
  anonymousClient,
  passkeyClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { AuthMobileClientOptions } from "..";
import type { AuthClientOptions } from "../types";

export const createClient = ({
  mobile,
  ...options
}: AuthClientOptions & { mobile: AuthMobileClientOptions }) =>
  createAuthClient({
    ...options,
    plugins: [
      ...(options.plugins ?? []),
      passkeyClient(),
      anonymousClient(),
      magicLinkClient(),
      twoFactorClient(),
      expoClient(mobile),
    ],
  });
