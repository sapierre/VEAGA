import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";

import { AUTH_PROVIDER } from "@turbostarter/auth";

import { auth } from "~/lib/auth";

import type { SOCIAL_PROVIDER } from "@turbostarter/auth";
import type {
  MagicLinkLoginData,
  PasswordLoginData,
  RegisterData,
} from "@turbostarter/shared/validators";
import type { LoginOption } from "~/lib/constants";

const redirectTo = makeRedirectUri();

type LoginPayload =
  | {
      option: Extract<LoginOption, "password">;
      data: PasswordLoginData;
    }
  | {
      option: Extract<LoginOption, "magicLink">;
      data: MagicLinkLoginData;
    };

export const login = async ({ data, option }: LoginPayload) => {
  if (option === AUTH_PROVIDER.PASSWORD) {
    const { error } = await auth().signInWithPassword(data);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  console.log(redirectTo);
  const { error } = await auth().signInWithOtp({
    ...data,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const register = async (input: RegisterData) => {
  const { error } = await auth().signUp({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  const { error } = await auth().signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    throw new Error(errorCode);
  }

  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) {
    return;
  }

  const { data, error } = await auth().setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    throw error;
  }

  return data.session;
};

export const loginWithOAuth = async (provider: SOCIAL_PROVIDER) => {
  const { data, error } = await auth().signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  console.log(data);
  if (error) {
    throw error;
  }

  const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};
