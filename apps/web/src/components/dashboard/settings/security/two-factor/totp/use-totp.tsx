import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";

import { useTranslation } from "@turbostarter/i18n";

import { twoFactor } from "~/lib/auth/client";

import { useBackupCodes } from "../backup-codes/use-backup-codes";

import type {
  OtpVerificationPayload,
  PasswordPayload,
} from "@turbostarter/auth";

const useUri = create<{
  uri: string;
  setUri: (uri: string) => void;
}>((set) => ({
  uri: "",
  setUri: (uri) => set({ uri }),
}));

export const useTotp = () => {
  const { t } = useTranslation(["auth"]);
  const { uri, setUri } = useUri();
  const { codes, setCodes } = useBackupCodes();

  const getUri = useMutation({
    mutationFn: async (data: PasswordPayload) => {
      const response = await twoFactor.getTotpUri(data, {
        throw: true,
      });

      setUri(response.totpURI);

      if (!codes.length) {
        const backupCodes = await twoFactor.generateBackupCodes(data, {
          throw: true,
        });

        setCodes(backupCodes.backupCodes);
      }
      return response;
    },
  });

  const verify = useMutation({
    mutationFn: async (data: OtpVerificationPayload) => {
      const loadingToast = toast.loading(t("account.twoFactor.totp.loading"));
      await twoFactor.verifyTotp(data, {
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
        },
        onSuccess: () => {
          toast.success(t("account.twoFactor.totp.success"), {
            id: loadingToast,
          });
        },
      });
    },
  });
  return { uri, setUri, verify, getUri };
};
