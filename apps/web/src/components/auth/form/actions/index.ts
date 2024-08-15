import { AUTH_PROVIDER } from "@turbostarter/auth";

import { auth } from "~/lib/auth/client";

import type {
  MagicLinkLoginData,
  PasswordLoginData,
  RegisterData,
} from "@turbostarter/auth";
import type { LoginOption } from "~/lib/constants";

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

    return { error: error?.message ?? null };
  }

  const { error } = await auth().signInWithOtp({
    ...data,
    options: {
      shouldCreateUser: false,
    },
  });

  return { error: error?.message ?? null };
};

export const register = async (input: RegisterData) => {
  const { error } = await auth().signUp({
    email: input.email,
    password: input.password,
  });

  return { error: error?.message ?? null };
};
