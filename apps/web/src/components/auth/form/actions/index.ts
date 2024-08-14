import { auth } from "~/lib/auth/client";

import type { LoginData, RegisterData } from "@turbostarter/auth";

export const login = async (data: LoginData) => {
  const { error } = await auth().signInWithPassword({
    ...data,
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
