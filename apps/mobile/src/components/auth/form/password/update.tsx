"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { updatePasswordSchema } from "@turbostarter/shared/validators";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import type { UpdatePasswordData } from "@turbostarter/shared/validators";

export const UpdatePasswordForm = memo(() => {
  const { mutate, isPending } = useMutation({});
  const form = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordData) => {};

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
          disabled={isPending}
        >
          {isPending ? (
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
