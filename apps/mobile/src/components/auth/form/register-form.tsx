import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { generateName, registerSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormItem,
  FormInput,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { signUp } from "~/lib/auth";

import type { RegisterPayload } from "@turbostarter/auth";

export const RegisterForm = memo(() => {
  const { t, errorMap } = useTranslation(["common", "auth"]);

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema, { errorMap }),
  });

  const onSubmit = async (data: RegisterPayload) => {
    await signUp.email(
      {
        ...data,
        name: generateName(data.email),
        callbackURL: pathsConfig.tabs.settings,
      },
      {
        onSuccess: () => {
          Alert.alert(
            t("register.success.title"),
            t("register.success.description"),
            [
              {
                text: t("continue"),
                onPress: () => {
                  router.navigate(pathsConfig.tabs.auth.login);
                  form.reset();
                },
              },
            ],
          );
        },
        onError: ({ error }) => {
          Alert.alert(t("error.title"), error.message);
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormInput
                label={t("password")}
                secureTextEntry
                autoComplete="password"
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
            <Text>{t("register.cta")}</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <View className="flex-row">
            <Text className="text-sm text-muted-foreground">
              {t("register.alreadyHaveAccount")}
            </Text>
            <Link
              href={pathsConfig.tabs.auth.login}
              className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
            >
              {t("login.cta")}
            </Link>
          </View>
        </View>
      </View>
    </Form>
  );
});

RegisterForm.displayName = "RegisterForm";
