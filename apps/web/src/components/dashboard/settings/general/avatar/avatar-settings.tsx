"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-web/avatar";
import { Button } from "@turbostarter/ui-web/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { useAvatar } from "./hooks/use-avatar";

import type { User } from "@turbostarter/auth";

interface AvatarSettingsProps {
  readonly user: User;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const avatarSchema = z.object({
  avatar: z
    .custom<FileList>()
    .refine((files) => files.length === 1, "Please select an image file.")
    .transform((files) => files[0])
    .refine(
      (file) => (file?.size ?? 0) <= MAX_FILE_SIZE,
      "File size must be less than 5MB.",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type ?? ""),
      "Only .jpg, .jpeg, .png and .webp files are accepted.",
    ),
});

type AvatarPayload = z.infer<typeof avatarSchema>;

export const AvatarSettings = memo<AvatarSettingsProps>(({ user }) => {
  const { upload, remove, previewUrl, setPreviewUrl } = useAvatar(user);
  const form = useForm<AvatarPayload>({
    resolver: zodResolver(avatarSchema),
  });

  const onSubmit = useCallback(
    (data: AvatarPayload) => {
      upload.mutate(data);
      form.reset();
    },
    [upload, form],
  );

  const hasError =
    form.formState.errors.avatar ?? (upload.isError || remove.isError);

  return (
    <Card className="w-full max-w-3xl overflow-hidden">
      <CardHeader className="relative block">
        <div className="float-right flex flex-col items-center justify-center gap-1">
          <div className="relative">
            <label className="group cursor-pointer">
              <Avatar
                className={`relative size-20 transition-all ${
                  hasError
                    ? "ring-2 ring-destructive ring-offset-2 ring-offset-background"
                    : "group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:ring-offset-2 group-focus-within:ring-offset-background"
                }`}
              >
                <AvatarImage src={previewUrl ?? undefined} />
                {(upload.isPending || remove.isPending) && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-sm">
                    <Icons.Loader2 className="size-7 animate-spin text-muted-foreground" />
                  </div>
                )}
                <AvatarFallback>
                  <Icons.UserRound className="size-10" />
                </AvatarFallback>
              </Avatar>

              <input
                {...form.register("avatar", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];

                    if (!file) {
                      return;
                    }

                    const isValid = avatarSchema.safeParse({
                      avatar: e.target.files,
                    });

                    if (isValid.success) {
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    }

                    void form.handleSubmit(onSubmit)();
                  },
                })}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                className="sr-only"
                aria-label="Upload avatar"
                onClick={(e) => "value" in e.target && (e.target.value = "")}
              />
            </label>
            {previewUrl && !upload.isPending && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-1 -top-1 size-6 rounded-full bg-background hover:bg-muted"
                onClick={() => {
                  form.clearErrors();
                  remove.mutate();
                }}
                disabled={remove.isPending}
              >
                <Icons.X className="size-3.5" />
                <span className="sr-only">Remove avatar</span>
              </Button>
            )}
          </div>
        </div>
        <CardTitle className="text-xl">Avatar</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          This is your avatar.
          <br />
          Click on the avatar to upload a custom one from your files.
        </CardDescription>

        {form.formState.errors.avatar && (
          <span className="mt-1 text-xs text-destructive">
            {form.formState.errors.avatar.message}
          </span>
        )}
      </CardHeader>

      <CardFooter className="flex min-h-14 items-center justify-between gap-10 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
        <span className="leading-tight">
          An avatar is optional but strongly recommended.
        </span>
      </CardFooter>
    </Card>
  );
});

AvatarSettings.displayName = "AvatarSettings";
