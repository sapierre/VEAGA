import { Pressable, View } from "react-native";

import { useDebounceCallback } from "@turbostarter/shared/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-mobile/avatar";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";

import { useSession } from "~/lib/auth";
import { useImagePicker } from "~/lib/hooks/use-image-picker";

import { useAvatar } from "./hooks/use-avatar";

export const AvatarSettings = () => {
  const { pick } = useImagePicker();
  const { data } = useSession();
  const { previewUrl, setPreviewUrl, upload } = useAvatar();

  const onEdit = useDebounceCallback(
    async () => {
      const image = await pick();

      if (!image) {
        return;
      }

      setPreviewUrl(image.uri);
      upload.mutate({ image });
    },
    500,
    { leading: true, trailing: false },
  );

  return (
    <View className="relative">
      <Avatar alt="" className="mb-4 size-28">
        {previewUrl && (
          <Pressable onPress={onEdit}>
            <AvatarImage source={{ uri: previewUrl }} />
          </Pressable>
        )}

        {upload.isPending && (
          <View className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80">
            <Icons.Loader2 className="size-7 animate-spin text-muted-foreground" />
          </View>
        )}
        <AvatarFallback>
          <Icons.UserRound
            className="text-foreground"
            width={50}
            height={50}
            strokeWidth={1.5}
          />
        </AvatarFallback>
      </Avatar>

      {data?.user && (
        <Button
          hitSlop={4}
          variant="outline"
          size="icon"
          className="absolute -right-1 bottom-2 rounded-full"
          onPress={onEdit}
          disabled={upload.isPending}
        >
          <Icons.Pencil size={15} className="text-foreground" />
        </Button>
      )}
    </View>
  );
};
