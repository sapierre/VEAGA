import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { magicLinkLoginSchema } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { login } from "~/lib/actions/auth";

import type { MagicLinkLoginData } from "@turbostarter/auth";

export const MagicLinkLoginForm = memo(() => {
  const form = useForm<MagicLinkLoginData>({
    resolver: zodResolver(magicLinkLoginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: MagicLinkLoginData) =>
      login({ data, option: AUTH_PROVIDER.MAGIC_LINK }),
    onSuccess: () => {
      Alert.alert(
        "Magic link sent!",
        "Please check your email to login with the magic link.",
      );
      form.reset();
    },
    onError: (error) => {
      Alert.alert("Something went wrong!", error.message);
    },
  });

  const onSubmit = (data: MagicLinkLoginData) => {
    mutate(data);
  };

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
            <Text>Send magic link</Text>
          )}
        </Button>
      </View>
    </Form>
  );
});

MagicLinkLoginForm.displayName = "MagicLinkLoginForm";
