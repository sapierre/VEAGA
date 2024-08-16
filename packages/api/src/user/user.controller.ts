import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import type { AuthClient } from "@turbostarter/auth";
import type { UpdateUserData } from "@turbostarter/shared/validators";

interface UserDependencies {
  readonly auth: AuthClient;
}

export const userControllerFactory = (deps: UserDependencies) => {
  return {
    updateUser: async (input: UpdateUserData) => {
      const { data, error } = await deps.auth.updateUser(input);

      if (error) {
        throw new ApiError(
          error.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          error.message,
        );
      }

      return {
        success: true,
        message: `Successfully updated your settings!`,
        data: data.user,
      };
    },
  };
};
