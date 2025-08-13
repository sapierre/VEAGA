"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { updatePasswordSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { resetPassword } from "~/lib/auth";

import type { UpdatePasswordPayload } from "@turbostarter/auth";

interface UpdatePasswordFormProps {
  readonly token?: string;
}

export const UpdatePasswordForm = memo<UpdatePasswordFormProps>(({ token }) => {
  const { t } = useTranslation(["common", "auth"]);

  const form = useForm({
    resolver: standardSchemaResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordPayload) => {
    await resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onSuccess: () => router.replace(pathsConfig.tabs.auth.login),
      },
    );
  };

  return (
    <Form {...form}>
      <View className="gap-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormInput
                label={t("password")}
                secureTextEntry
                autoComplete="new-password"
                {...field}
              />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>{t("account.password.update.cta")}</Text>
          )}
        </Button>
      </View>
    </Form>
  );
});

UpdatePasswordForm.displayName = "UpdatePasswordForm";
