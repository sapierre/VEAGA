import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hc } from "hono/client";
import { useState } from "react";

import { getCookie } from "~/lib/auth";

import { getBaseUrl } from "./utils";

import type { AppRouter } from "@turbostarter/api";

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: () => ({
    cookie: getCookie(),
    "x-hono-source": "mobile",
  }),
});

export function ApiProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
