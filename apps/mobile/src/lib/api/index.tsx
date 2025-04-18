import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { hc } from "hono/client";
import { useState } from "react";

import { config } from "@turbostarter/i18n";

import { getCookie } from "~/lib/auth";
import { useRefetchOnAppFocus } from "~/lib/hooks/use-refetch-on-app-focus";
import { useI18nConfig } from "~/providers/i18n";

import { getBaseUrl } from "./utils";

import type { AppRouter } from "@turbostarter/api";

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: () => ({
    cookie: `${config.cookie}=${useI18nConfig.getState().config.locale};${getCookie()}`,
    "x-api-source": "mobile",
  }),
});

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return () => eventSubscription.remove();
});

export function ApiProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useRefetchOnAppFocus();
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
