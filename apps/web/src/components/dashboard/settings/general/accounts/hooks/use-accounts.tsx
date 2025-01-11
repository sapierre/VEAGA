import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
import { capitalize } from "@turbostarter/shared/utils";

import { listAccounts, unlinkAccount } from "~/lib/auth/client";
import { linkSocial } from "~/lib/auth/client";

const QUERY_KEY = ["accounts"];

export const useAccounts = () => {
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
    mutationFn: (provider: SOCIAL_PROVIDER) => {
      const loadingToast = toast.loading(
        `Connecting ${capitalize(provider)} account...`,
      );

      return linkSocial(
        {
          provider,
          callbackURL: window.location.href,
        },
        {
          onSuccess: () => {
            toast.success(`${capitalize(provider)} account connected!`, {
              id: loadingToast,
            });
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
    mutationFn: (provider: SOCIAL_PROVIDER) => {
      const loadingToast = toast.loading(
        `Disconnecting ${capitalize(provider)} account...`,
      );

      return unlinkAccount(
        { providerId: provider },
        {
          onError: ({ error }) => {
            toast.error(`${error.message}!`, {
              id: loadingToast,
            });
          },
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success(`${capitalize(provider)} account disconnected!`, {
              id: loadingToast,
            });
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
