import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

import { createClient } from "@turbostarter/auth/client/mobile";
import { config } from "@turbostarter/i18n";

import { getBaseUrl } from "~/lib/api/utils";
import { useI18nConfig } from "~/providers/i18n";

export const {
  useSession,
  signIn,
  signOut,
  deleteUser,
  changeEmail,
  sendVerificationEmail,
  signUp,
  getCookie,
  forgetPassword,
  resetPassword,
  changePassword,
  getSession,
  listAccounts,
  updateUser,
  linkSocial,
  unlinkAccount,
  magicLink,
  twoFactor,
} = createClient({
  baseURL: getBaseUrl(),
  mobile: {
    storage: SecureStore,
  },
  fetchOptions: {
    headers: {
      Cookie: `${config.cookie}=${useI18nConfig.getState().config.locale}`,
    },
    throw: true,
    onError: ({ error }) => {
      console.error(error);
      Alert.alert(error.message);
    },
  },
});
