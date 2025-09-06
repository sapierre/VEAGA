import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { SocialProvider } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";

import { listAccounts, unlinkAccount, useSession } from "~/lib/auth/client";
import { linkSocial } from "~/lib/auth/client";

const QUERY_KEY = (userId: string) => ["accounts", userId];

export const useAccounts = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("auth");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY(session?.user.id ?? ""),
    queryFn: () => listAccounts(),
  });

  const accounts = data?.data ?? [];
  const socials = accounts.filter((account) =>
    Object.values(SocialProvider).includes(account.providerId),
  );
  const missing = Object.values(SocialProvider).filter(
    (provider) => !socials.some((social) => social.providerId === provider),
  );

  const connect = useMutation({
    mutationFn: (provider: SocialProvider) => {
      const loadingToast = toast.loading(
        t("account.accounts.connect.loading", { provider }),
      );

      return linkSocial(
        {
          provider,
          callbackURL: window.location.href,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: QUERY_KEY(session?.user.id ?? ""),
            });
            toast.success(
              t("account.accounts.connect.success", {
                provider: capitalize(provider),
              }),
              {
                id: loadingToast,
              },
            );
          },
          onError: ({ error }) => {
            toast.error(error.message, {
              id: loadingToast,
            });
          },
        },
      );
    },
  });

  const disconnect = useMutation({
    mutationFn: (provider: SocialProvider) => {
      const loadingToast = toast.loading(
        t("account.accounts.disconnect.loading", { provider }),
      );

      return unlinkAccount(
        { providerId: provider },
        {
          onError: ({ error }) => {
            toast.error(error.message, {
              id: loadingToast,
            });
          },
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: QUERY_KEY(session?.user.id ?? ""),
            });
            toast.success(
              t("account.accounts.disconnect.success", {
                provider: capitalize(provider),
              }),
              {
                id: loadingToast,
              },
            );
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
