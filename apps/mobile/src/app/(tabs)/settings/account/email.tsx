import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";

import { emailSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Badge } from "@turbostarter/ui-mobile/badge";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormItem,
  FormInput,
  FormDescription,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { changeEmail, sendVerificationEmail, useSession } from "~/lib/auth";

import type { EmailPayload } from "@turbostarter/auth";

const EditEmail = memo(() => {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const { data, refetch } = useSession();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const form = useForm<EmailPayload>({
    resolver: zodResolver(emailSchema, { errorMap }),
    defaultValues: {
      email: data?.user.email ?? "",
    },
  });

  const sendVerification = useMutation({
    mutationFn: () =>
      sendVerificationEmail(
        {
          email: data?.user.email ?? "",
          callbackURL: pathsConfig.tabs.settings.account.email,
        },
        {
          onSuccess: () => {
            Alert.alert(t("message"), t("account.email.confirm.email.sent"));
          },
          onError: ({ error }) => {
            Alert.alert(t("error.title"), error.message);
          },
        },
      ),
  });

  const onSubmit = async (data: EmailPayload) => {
    await changeEmail(
      {
        newEmail: data.email,
        callbackURL: pathsConfig.tabs.settings.account.email,
      },
      {
        onSuccess: () => {
          Alert.alert(t("message"), t("account.email.change.success"));
          router.back();
        },
        onError: ({ error }) => {
          Alert.alert(t("error.title"), error.message);
        },
      },
    );
  };

  return (
    <ScrollView bounces={false} className="flex-1 bg-background p-6">
      <Form {...form}>
        <View className="flex-1 gap-6">
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Badge
                className={cn(
                  data?.user.emailVerified
                    ? "border-transparent bg-success/15"
                    : "border-transparent bg-destructive/15",
                )}
              >
                <Text
                  className={
                    data?.user.emailVerified
                      ? "text-success"
                      : "text-destructive"
                  }
                >
                  {data?.user.emailVerified ? t("verified") : t("unverified")}
                </Text>
              </Badge>
              {!data?.user.emailVerified && (
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => sendVerification.mutate()}
                  disabled={sendVerification.isPending}
                >
                  <Text>
                    {sendVerification.isPending
                      ? t("account.email.confirm.loading")
                      : t("account.email.confirm.cta")}
                  </Text>
                </Button>
              )}
            </View>
            <Text className="text-base font-medium text-muted-foreground">
              {t("account.email.change.description")}
            </Text>
          </View>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormInput
                  label={t("email")}
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  editable={!form.formState.isSubmitting}
                  {...field}
                />
                <FormDescription>
                  {t("account.email.change.info")}
                </FormDescription>
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
              <Text>{t("save")}</Text>
            )}
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
});

EditEmail.displayName = "EditEmail";

export default EditEmail;
