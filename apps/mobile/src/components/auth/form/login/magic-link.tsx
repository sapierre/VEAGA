import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { AUTH_PROVIDER, generateName } from "@turbostarter/auth";
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
import { Spinner } from "~/components/common/spinner";
import { pathsConfig } from "~/config/paths";
import { magicLink, signIn } from "~/lib/auth";

import type { MagicLinkLoginPayload } from "@turbostarter/auth";

export const VerifyMagicLink = () => {
  const { t } = useTranslation("common");
  const { token } = useLocalSearchParams<{ token?: string }>();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      await magicLink.verify(
        { query: { token } },
        {
          onSuccess: () => {
            router.setParams({ token: undefined });
            router.navigate(pathsConfig.tabs.settings.index);
          },
          onError: ({ error }) => {
            Alert.alert(t("error.title"), error.message);
          },
        },
      );
    },
  });

  useEffect(() => {
    if (token) {
      mutate();
    }
  }, [token, mutate]);

  if (isPending) {
    return <Spinner />;
  }

  return null;
};

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
        name: generateName(data.email),
        email: data.email,
        callbackURL: pathsConfig.tabs.auth.login,
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
