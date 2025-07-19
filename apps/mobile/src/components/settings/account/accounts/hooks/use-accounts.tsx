import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { SocialProvider } from "@turbostarter/auth";
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
    Object.values(SocialProvider).includes(account.provider),
  );
  const missing = Object.values(SocialProvider).filter(
    (provider) => !socials.some((social) => social.provider === provider),
  );

  const connect = useMutation({
    mutationFn: async (provider: SocialProvider) => {
      await signIn.social({
        provider,
        callbackURL: pathsConfig.tabs.settings.index,
      });

      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const disconnect = useMutation({
    mutationFn: async (provider: SocialProvider) => {
      await unlinkAccount(
        { providerId: provider },
        {
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
