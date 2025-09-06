import { useMutation } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { Alert } from "react-native";

import { handle } from "@turbostarter/api/utils";
import { useTranslation } from "@turbostarter/i18n";

import { api } from "~/lib/api";
import { updateUser, useSession } from "~/lib/auth";

import type { ImagePickerAsset } from "expo-image-picker";

export const useAvatar = () => {
  const { data } = useSession();
  const { t } = useTranslation(["common", "auth"]);
  const [previewUrl, setPreviewUrl] = useState(data?.user.image ?? null);

  const upload = useMutation({
    mutationFn: async (payload: { image: ImagePickerAsset }) => {
      const extension = payload.image.uri.split(".").pop();
      const uuid = Crypto.randomUUID();
      const path = `avatars/${data?.user.id}-${uuid}.${extension}`;

      const blob = await fetch(payload.image.uri).then((r) => r.blob());

      const { url: uploadUrl } = await handle(api.storage.upload.$get)({
        query: { path },
      });

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": payload.image.mimeType ?? "",
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

      return { publicUrl, oldImage: data?.user.image };
    },
    onError: (error) => {
      setPreviewUrl(data?.user.image ?? null);
      Alert.alert(t("error.title"), error.message);
    },
    onSuccess: async ({ oldImage }) => {
      if (oldImage) {
        const oldPath = oldImage.split("/").pop();
        if (oldPath) {
          const { url: deleteUrl } = await handle(api.storage.delete.$get)({
            query: { path: `avatars/${oldPath}` },
          });
          void fetch(deleteUrl, { method: "DELETE" });
        }
      }

      Alert.alert(t("success"), t("account.avatar.update.success"));
    },
  });

  return {
    upload,
    previewUrl,
    setPreviewUrl,
  };
};
