import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { changePasswordSchema } from "@turbostarter/auth";
import { Trans, useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormDescription,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useAccounts } from "~/components/settings/account/accounts/hooks/use-accounts";
import { pathsConfig } from "~/config/paths";
import { changePassword } from "~/lib/auth";

import type { ChangePasswordPayload } from "@turbostarter/auth";

export default function Password() {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const { accounts, isLoading } = useAccounts();

  const form = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema, { errorMap }),
  });

  const onSubmit = async (data: ChangePasswordPayload) => {
    await changePassword(
      {
        ...data,
        currentPassword: data.password,
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => {
          Alert.alert(
            t("auth:account.password.update.title"),
            t("auth:account.password.update.success"),
            [
              {
                text: t("continue"),
                onPress: () => {
                  router.back();
                  form.reset();
                },
              },
            ],
          );
        },
      },
    );
  };

  const hasPassword = accounts
    .map((account) => account.provider)
    .includes("credential");

  return (
    <ScrollView bounces={false} className="flex-1 bg-background p-6">
      <Form {...form}>
        <View className="flex-1 gap-6">
          <View className="gap-2">
            <Text className="text-base font-medium text-muted-foreground">
              {t("auth:account.password.update.description")}
            </Text>
          </View>

          {isLoading ? (
            <View className="h-20 animate-pulse bg-muted/50" key="loading" />
          ) : (
            <View className="gap-4" key="password">
              {hasPassword ? (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormInput
                          label={t("auth:currentPassword")}
                          secureTextEntry
                          autoComplete="current-password"
                          disabled={form.formState.isSubmitting}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormInput
                          label={t("auth:newPassword")}
                          secureTextEntry
                          autoComplete="new-password"
                          disabled={form.formState.isSubmitting}
                          {...field}
                        />
                        <FormDescription>
                          {t("auth:account.password.update.info")}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <View className="items-center justify-center rounded-lg border border-dashed border-border p-6">
                  <Text className="text-center text-muted-foreground">
                    <Trans
                      i18nKey="account.password.update.noPassword"
                      ns="auth"
                      components={{
                        bold: (
                          <Link
                            href={pathsConfig.tabs.auth.forgotPassword}
                            className="font-sans-bold underline hover:no-underline"
                          />
                        ),
                      }}
                    />
                  </Text>
                </View>
              )}
            </View>
          )}

          {!isLoading && hasPassword && (
            <Button
              variant="default"
              size="lg"
              disabled={form.formState.isSubmitting}
              onPress={form.handleSubmit(onSubmit)}
            >
              {form.formState.isSubmitting ? (
                <Icons.Loader2 className="animate-spin text-primary-foreground" />
              ) : (
                <Text className="text-primary-foreground">
                  {t("common:save")}
                </Text>
              )}
            </Button>
          )}
        </View>
      </Form>
    </ScrollView>
  );
}
