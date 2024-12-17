import { createClient } from "@turbostarter/auth";

import { env } from "~/lib/env";

export const auth = () => {
  return createClient({
    url: env.VITE_SUPABASE_URL,
    key: env.VITE_SUPABASE_ANON_KEY,
  });
};
