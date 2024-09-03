import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { forgotPasswordSchema } from "@turbostarter/shared/validators";
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
// import { forgotPassword } from "~/lib/actions/auth";

import type { ForgotPasswordData } from "@turbostarter/shared/validators";

export const ForgotPasswordForm = memo(() => {
  const { mutate, isPending } = useMutation({});
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {};

  return (
    <Form {...form}>
      <View className="gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormInput
                label="Email"
                autoCapitalize="none"
                autoComplete="email"
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
            <Text>Send reset link</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <Link
            href={pathsConfig.tabs.auth.login}
            className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
          >
            Back to sign in
          </Link>
        </View>
      </View>
    </Form>
  );
});

ForgotPasswordForm.displayName = "ForgotPasswordForm";
