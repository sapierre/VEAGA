import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
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
  const { t } = useTranslation(["common", "auth"]);

  const form = useForm({
    resolver: standardSchemaResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterPayload) => {
    await signUp.email(
      {
        ...data,
        name: generateName(data.email),
        callbackURL: pathsConfig.setup.steps.start,
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
                  router.navigate(pathsConfig.setup.auth.login);
                  form.reset();
                },
              },
            ],
          );
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
      </View>
    </Form>
  );
});

RegisterForm.displayName = "RegisterForm";

export const RegisterCta = () => {
  const { t } = useTranslation("auth");

  return (
    <View className="items-center justify-center pt-2">
      <View className="flex-row">
        <Text className="text-sm text-muted-foreground">
          {t("login.noAccount")}
        </Text>
        <Link
          href={pathsConfig.setup.auth.register}
          className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
        >
          {t("register.cta")}
        </Link>
      </View>
    </View>
  );
};
