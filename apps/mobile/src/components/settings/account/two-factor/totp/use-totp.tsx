import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { create } from "zustand";

import { useTranslation } from "@turbostarter/i18n";

import { twoFactor } from "~/lib/auth";

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
      await twoFactor.verifyTotp(data, {
        onSuccess: () => {
          Alert.alert(t("account.twoFactor.totp.success"));
        },
      });
    },
  });
  return { uri, setUri, verify, getUri };
};
