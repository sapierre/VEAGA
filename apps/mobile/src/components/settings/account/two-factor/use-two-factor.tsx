import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { useTranslation } from "@turbostarter/i18n";

import { twoFactor, useSession } from "~/lib/auth";

import type { PasswordPayload } from "@turbostarter/auth";

export const useTwoFactor = () => {
  const { data } = useSession();
  const { t } = useTranslation(["auth", "common"]);

  const enabled = data?.user.twoFactorEnabled ?? false;

  const enable = useMutation({
    mutationFn: (data: PasswordPayload) =>
      twoFactor.enable(data, { throw: true }),
  });

  const disable = useMutation({
    mutationFn: async (data: PasswordPayload) => {
      return twoFactor.disable(data, {
        onSuccess: () => {
          Alert.alert(t("account.twoFactor.disable.success"));
        },
      });
    },
  });

  return { enabled, enable, disable };
};
