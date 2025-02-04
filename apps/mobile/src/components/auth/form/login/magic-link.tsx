import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { magicLinkLoginSchema } from "@turbostarter/auth";
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

import { useAuthFormStore } from "~/components/auth/form/store";
import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth";

import type { MagicLinkLoginPayload } from "@turbostarter/auth";

export const MagicLinkLoginForm = memo(() => {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();

  const form = useForm<MagicLinkLoginPayload>({
    resolver: zodResolver(magicLinkLoginSchema, { errorMap }),
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
            t("login.magicLink.success.title"),
            t("login.magicLink.success.description"),
          );
          form.reset();
        },
        onError: ({ error }) => {
          Alert.alert(t("error.title"), error.message);
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
                label={t("email")}
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
            <Text>{t("login.magicLink.cta")}</Text>
          )}
        </Button>
      </View>
    </Form>
  );
});

MagicLinkLoginForm.displayName = "MagicLinkLoginForm";
