import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  unstable_httpBatchStreamLink as httpBatchStreamLink,
  loggerLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import Constants from "expo-constants";
import { useState } from "react";
import superjson from "superjson";

import { NodeEnv } from "@turbostarter/shared/constants";

import { auth } from "~/lib/auth";
import { env } from "~/lib/env";

import type { AppRouter } from "@turbostarter/api";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@turbostarter/api";

const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    console.warn("Failed to get localhost. Pointing to production server...");
    return env.EXPO_PUBLIC_SITE_URL;
  }
  return `http://${localhost}:3000`;
};

export const TRPCProvider = (props: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchStreamLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "mobile");

            const { data } = await auth().getSession();
            const token = data.session?.access_token;
            if (token) {
              headers.set("authorization", token);
            }

            return Object.fromEntries(headers);
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              reactNative: { textStreaming: true },
            } as unknown as RequestInit);
          },
        }),
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === NodeEnv.DEVELOPMENT ||
            (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
};
