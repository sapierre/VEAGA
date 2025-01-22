import { hc } from "hono/client";
import { headers } from "next/headers";

import { getBaseUrl } from "./utils";

import type { AppRouter } from "@turbostarter/api";

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: async () => ({
    ...Object.fromEntries((await headers()).entries()),
    "x-hono-source": "web-server",
  }),
});
