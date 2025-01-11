import { zodResolver } from "@hookform/resolvers/zod";
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

import { useAuthFormStore } from "~/components/auth/form/store";
import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth";

import type { MagicLinkLoginPayload } from "@turbostarter/auth";

export const MagicLinkLoginForm = memo(() => {
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();

  const form = useForm<MagicLinkLoginPayload>({
    resolver: zodResolver(magicLinkLoginSchema),
  });

  const onSubmit = async (data: MagicLinkLoginPayload) => {
    await signIn.magicLink(
      {
        email: data.email,
        callbackURL: pathsConfig.tabs.settings,
      },
      {
        onRequest: () => {
          setProvider(AUTH_PROVIDER.MAGIC_LINK);
          setIsSubmitting(true);
        },
        onSuccess: () => {
          Alert.alert(
            "Magic link sent!",
            "Please check your email to login with the magic link.",
          );
          form.reset();
        },
        onError: ({ error }) => {
          Alert.alert("Something went wrong!", error.message);
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
      },
    );
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
          disabled={isSubmitting}
        >
          {isSubmitting && provider === AUTH_PROVIDER.MAGIC_LINK ? (
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
