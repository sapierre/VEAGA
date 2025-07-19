import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTranslation } from "@turbostarter/i18n";

import { twoFactor, useSession } from "~/lib/auth/client";

import type { PasswordPayload } from "@turbostarter/auth";

export const useTwoFactor = () => {
  const { data } = useSession();
  const { t } = useTranslation("auth");

  const enabled = data?.user.twoFactorEnabled ?? false;

  const enable = useMutation({
    mutationFn: (data: PasswordPayload) =>
      twoFactor.enable(data, { throw: true }),
  });

  const disable = useMutation({
    mutationFn: async (data: PasswordPayload) => {
      const loadingToast = toast.loading(
        t("account.twoFactor.disable.loading"),
      );

      return twoFactor.disable(data, {
        onError: ({ error }) => {
          toast.error(error.message, {
            id: loadingToast,
          });
        },
        onSuccess: () => {
          toast.success(t("account.twoFactor.disable.success"), {
            id: loadingToast,
          });
        },
      });
    },
  });

  return { enabled, enable, disable };
};
