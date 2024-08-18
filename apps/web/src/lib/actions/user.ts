"use server";

import { handleError } from "@turbostarter/shared/utils";

import { api } from "~/trpc/server";

import type { UpdateUserData } from "@turbostarter/shared/validators";

export const updateUser = async (input: UpdateUserData) => {
  try {
    const { message, data, success } = await api.user.update(input);

    return {
      message,
      success,
      data,
    };
  } catch (e: unknown) {
    return handleError(e);
  }
};
