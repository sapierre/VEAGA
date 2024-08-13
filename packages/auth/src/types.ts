import type {
  CookieMethodsBrowser,
  CookieMethodsServer,
  CookieOptionsWithName,
} from "@supabase/ssr";
import type {
  SupabaseClientOptions as SupabaseClientOptionsType,
  EmailOtpType,
} from "@supabase/supabase-js";
import type { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

type AuthClientOptions = SupabaseClientOptionsType<"public"> & {
  cookieOptions?: CookieOptionsWithName;
};

type AuthBrowserClientOptions = AuthClientOptions & {
  cookies: CookieMethodsBrowser;
};

type AuthServerClientOptions = AuthClientOptions & {
  cookies: CookieMethodsServer;
};

interface AuthClientConfig {
  url: string;
  key: string;
}

type AuthClient = SupabaseAuthClient;

export type {
  AuthClient,
  AuthClientConfig,
  AuthBrowserClientOptions,
  AuthServerClientOptions,
  EmailOtpType,
};
