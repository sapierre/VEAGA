import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hc } from "hono/client";
import { useState } from "react";

import { config } from "@turbostarter/i18n";

import { getCookie } from "~/lib/auth";
import { useI18nConfig } from "~/providers/i18n";

import { getBaseUrl } from "./utils";

import type { AppRouter } from "@turbostarter/api";

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: {
    cookie: `${config.cookie}=${useI18nConfig.getState().config.locale};${getCookie()}`,
    "x-api-source": "mobile",
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
