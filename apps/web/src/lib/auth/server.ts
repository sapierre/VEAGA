import { headers } from "next/headers";

import { auth } from "@turbostarter/auth/server";

export const getSession = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session: data?.session ?? null,
    user: data?.user ?? null,
  };
};
