import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTranslation } from "@turbostarter/i18n";

import { passkey, useSession } from "~/lib/auth/client";

const QUERY_KEY = (userId: string) => ["passkeys", userId];

export const usePasskeys = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("auth");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY(session?.user.id ?? ""),
    queryFn: () => passkey.listUserPasskeys(),
  });

  const passkeys = data?.data ?? [];

  const add = useMutation({
    mutationFn: async () => {
      const loadingToast = toast.loading(t("account.passkeys.add.loading"));

      await passkey.addPasskey({
        fetchOptions: {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: QUERY_KEY(session?.user.id ?? ""),
            });
            toast.success(t("account.passkeys.add.success"), {
              id: loadingToast,
            });
          },
          onError: ({ error }) => {
            toast.error(error.message, {
              id: loadingToast,
            });
          },
        },
      });

      toast.dismiss(loadingToast);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const loadingToast = toast.loading(t("account.passkeys.remove.loading"));

      await passkey.deletePasskey(
        {
          id,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: QUERY_KEY(session?.user.id ?? ""),
            });
            toast.success(t("account.passkeys.remove.success"), {
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

  return {
    passkeys,
    isLoading,
    add,
    remove,
  };
};
