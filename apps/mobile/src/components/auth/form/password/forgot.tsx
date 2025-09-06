import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Constants from "expo-constants";
import { Link } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { forgotPasswordSchema } from "@turbostarter/auth";
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
import { forgetPassword } from "~/lib/auth";

import type { ForgotPasswordPayload } from "@turbostarter/auth";

export const ForgotPasswordForm = memo(() => {
  const { t } = useTranslation(["common", "auth"]);

  const form = useForm({
    resolver: standardSchemaResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordPayload) => {
    await forgetPassword(
      {
        ...data,
        redirectTo: `${Constants.expoConfig?.scheme?.toString()}://${pathsConfig.setup.auth.updatePassword}`,
      },
      {
        onSuccess: () => {
          Alert.alert(
            t("account.password.forgot.success.title"),
            t("account.password.forgot.success.description"),
          );
          form.reset();
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>{t("account.password.forgot.cta")}</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <Link
            replace
            href={pathsConfig.setup.auth.login}
            className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
          >
            {t("account.password.forgot.back")}
          </Link>
        </View>
      </View>
    </Form>
  );
});

ForgotPasswordForm.displayName = "ForgotPasswordForm";
