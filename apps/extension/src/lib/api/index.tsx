import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hc } from "hono/client";
import { useState } from "react";

import { appConfig } from "~/config/app";

import type { AppRouter } from "@turbostarter/api";

export const getBaseUrl = () => {
  return appConfig.url;
};

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: {
    "x-api-source": "extension",
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
