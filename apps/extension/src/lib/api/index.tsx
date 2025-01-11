import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hc } from "hono/client";
import { useState } from "react";

import { env } from "~/lib/env";

import type { AppRouter } from "@turbostarter/api";

export const getBaseUrl = () => {
  return env.VITE_SITE_URL;
};

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: {
    "x-hono-source": "extension",
  },
});

export function ApiProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
