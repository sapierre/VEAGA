import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { handle } from "@turbostarter/api/utils";
import { useTranslation } from "@turbostarter/i18n";

import { api } from "~/lib/api/client";
import { updateUser } from "~/lib/auth/client";

import type { User } from "@turbostarter/auth";

export const useAvatar = (user: User) => {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState(user.image ?? null);

  const upload = useMutation({
    mutationFn: async (data: { avatar?: File }) => {
      const extension = data.avatar?.type.split("/").pop();
      const uuid = crypto.randomUUID();
      const path = `avatars/${user.id}-${uuid}.${extension}`;

      const { url: uploadUrl } = await handle(api.storage.upload.$get)({
        query: { path },
      });

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: data.avatar,
        headers: {
          "Content-Type": data.avatar?.type ?? "",
        },
      });

      if (!response.ok) {
        throw new Error(t("account.avatar.update.error"));
      }

      const { url: publicUrl } = await handle(api.storage.public.$get)({
        query: { path },
      });

      const { error } = await updateUser({
        image: publicUrl,
      });

      if (error) throw new Error(error.message);

      return { publicUrl, oldImage: user.image };
    },
    onMutate: () => {
      const id = toast.loading(t("account.avatar.update.loading"));
      return { id };
    },
    onError: (error, _, context) => {
      setPreviewUrl(user.image ?? null);
      toast.error(error.message, { id: context?.id });
    },
    onSuccess: async ({ publicUrl, oldImage }, _b, context) => {
      await new Promise((resolve) => {
        const img = new Image();
        img.src = publicUrl;
        img.onload = resolve;
      });

      if (oldImage) {
        const oldPath = oldImage.split("/").pop();
        if (oldPath) {
          const { url: deleteUrl } = await handle(api.storage.delete.$get)({
            query: { path: `avatars/${oldPath}` },
          });
          void fetch(deleteUrl, { method: "DELETE" });
        }
      }

      toast.success(t("account.avatar.update.success"), { id: context.id });
      router.refresh();
    },
  });

  const remove = useMutation({
    mutationFn: async () => {
      if (!user.image) return;

      const path = user.image.split("/").pop();
      if (!path) return;

      const { error } = await updateUser({
        image: null,
      });

      if (error) throw new Error(error.message);

      const { url: deleteUrl } = await handle(api.storage.delete.$get)({
        query: { path: `avatars/${path}` },
      });

      void fetch(deleteUrl, {
        method: "DELETE",
      });
    },
    onMutate: () => {
      const id = toast.loading(t("account.avatar.remove.loading"));
      setPreviewUrl(null);
      return { id };
    },
    onError: (error, _, context) => {
      toast.error(error.message, { id: context?.id });
    },
    onSuccess: (_, __, context) => {
      setPreviewUrl(null);
      toast.success(t("account.avatar.remove.success"), { id: context.id });
      router.refresh();
    },
  });

  return {
    upload,
    remove,
    previewUrl,
    setPreviewUrl,
  };
};
