import {
  createBrowserClient as createBrowserSupabaseClient,
  createServerClient as createServerSupabaseClient,
} from "@supabase/ssr";

import type {
  AuthBrowserClientOptions,
  AuthClient,
  AuthClientConfig,
  AuthServerClientOptions,
} from "./types";

const createBrowserClient = (
  config: AuthClientConfig,
  options?: AuthBrowserClientOptions,
): AuthClient => {
  return createBrowserSupabaseClient(config.url, config.key, options).auth;
};

const createServerClient = (
  config: AuthClientConfig,
  options: AuthServerClientOptions,
): AuthClient => {
  return createServerSupabaseClient(config.url, config.key, options).auth;
};

export { createBrowserClient, createServerClient };
