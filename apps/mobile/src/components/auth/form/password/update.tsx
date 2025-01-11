"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { updatePasswordSchema } from "@turbostarter/auth";
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

export const UpdatePasswordForm = memo(() => {
  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordPayload) => {
    await resetPassword(
      {
        newPassword: data.password,
      },
      {
        onSuccess: () => router.replace(pathsConfig.tabs.auth.login),
        onError: ({ error }) => {
          Alert.alert("Something went wrong!", error.message);
        },
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
                label="Password"
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
            <Text>Update password</Text>
          )}
        </Button>
      </View>
    </Form>
  );
});

UpdatePasswordForm.displayName = "UpdatePasswordForm";
