import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";

import { twoFactor } from "~/lib/auth/client";

import type {
  BackupCodeVerificationPayload,
  PasswordPayload,
} from "@turbostarter/auth";

const useBackupCodesStore = create<{
  codes: string[];
  setCodes: (codes: string[]) => void;
}>((set) => ({
  codes: [],
  setCodes: (codes) => set({ codes }),
}));

export const useBackupCodes = () => {
  const { codes, setCodes } = useBackupCodesStore();

  const generate = useMutation({
    mutationFn: async (data: PasswordPayload) => {
      const response = await twoFactor.generateBackupCodes(data, {
        throw: true,
      });

      setCodes(response.backupCodes);

      return response;
    },
  });

  const verify = useMutation({
    mutationFn: (data: BackupCodeVerificationPayload) =>
      twoFactor.verifyBackupCode(data),
  });

  return { codes, setCodes, generate, verify };
};
