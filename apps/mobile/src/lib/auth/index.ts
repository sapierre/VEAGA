import * as SecureStore from "expo-secure-store";

import { createClient } from "@turbostarter/auth/client/mobile";

import { getBaseUrl } from "~/lib/api/utils";

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  getCookie,
  forgetPassword,
  resetPassword,
  getSession,
} = createClient({
  baseURL: getBaseUrl(),
  mobile: {
    storage: SecureStore,
  },
});
