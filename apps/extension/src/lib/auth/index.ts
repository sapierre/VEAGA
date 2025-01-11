import { createClient } from "@turbostarter/auth/client/web";

import { getBaseUrl } from "~/lib/api";

export const { useSession, signOut } = createClient({
  baseURL: getBaseUrl(),
});
