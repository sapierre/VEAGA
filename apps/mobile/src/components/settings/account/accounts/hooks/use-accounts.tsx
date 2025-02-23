import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";

import { pathsConfig } from "~/config/paths";
import { listAccounts, unlinkAccount, signIn } from "~/lib/auth";

const QUERY_KEY = ["accounts"];

export const useAccounts = () => {
  const { t } = useTranslation(["auth", "common"]);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listAccounts(),
  });

  const accounts = data?.data ?? [];
  const socials = accounts.filter((account) =>
    Object.values(SOCIAL_PROVIDER).includes(account.provider),
  );
  const missing = Object.values(SOCIAL_PROVIDER).filter(
    (provider) => !socials.some((social) => social.provider === provider),
  );

  const connect = useMutation({
    mutationFn: async (provider: SOCIAL_PROVIDER) => {
      await signIn.social(
        {
          provider,
          callbackURL: pathsConfig.tabs.settings.index,
        },
        {
          onError: ({ error }) => {
            Alert.alert(t("error.title"), error.message);
          },
        },
      );

      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const disconnect = useMutation({
    mutationFn: async (provider: SOCIAL_PROVIDER) => {
      await unlinkAccount(
        { providerId: provider },
        {
          onError: ({ error }) => {
            Alert.alert(t("error.title"), error.message);
          },
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
          },
        },
      );
    },
  });

  return {
    connect,
    disconnect,
    accounts,
    socials,
    missing,
    isLoading,
  };
};
