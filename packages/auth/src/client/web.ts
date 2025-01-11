import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { AuthClientOptions } from "../types";

export const createClient = (options?: AuthClientOptions) =>
  createAuthClient({
    ...options,
    plugins: [...(options?.plugins ?? []), magicLinkClient()],
  });
