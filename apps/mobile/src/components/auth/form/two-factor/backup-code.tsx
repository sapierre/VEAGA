import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { backupCodeVerificationSchema, SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormCheckbox,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { twoFactor } from "~/lib/auth";

import type { CtaProps } from ".";
import type { BackupCodeVerificationPayload } from "@turbostarter/auth";

const BackupCodeForm = memo(() => {
  const { t } = useTranslation(["common", "auth"]);
  const form = useForm({
    resolver: standardSchemaResolver(backupCodeVerificationSchema),
    defaultValues: {
      code: "",
      trustDevice: false,
    },
  });

  const onSubmit = async (data: BackupCodeVerificationPayload) => {
    await twoFactor.verifyBackupCode(data, {
      onSuccess: () => {
        router.replace(pathsConfig.index);
      },
    });
  };

  return (
    <Form {...form}>
      <View className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormInput
                autoFocus
                placeholder={t("login.twoFactor.backupCode.placeholder")}
                autoCapitalize="none"
                autoComplete="one-time-code"
                {...field}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trustDevice"
          render={({ field }) => (
            <FormCheckbox
              className="-ml-0.5 -mt-2"
              name="trustDevice"
              label={t("login.twoFactor.trustDevice")}
              value={field.value ?? false}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        <Button
          className="w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
          onPress={form.handleSubmit(onSubmit)}
        >
          {form.formState.isSubmitting ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>{t("verify")}</Text>
          )}
        </Button>
      </View>
    </Form>
  );
});

const BackupCodeCta = memo<CtaProps>(({ onFactorChange }) => {
  const { t } = useTranslation("auth");
  return (
    <View className="flex items-center justify-center pt-2">
      <Text
        onPress={() => onFactorChange(SecondFactor.BACKUP_CODE)}
        className="cursor-pointer pl-2 text-sm font-medium text-muted-foreground underline underline-offset-4"
      >
        {t("login.twoFactor.backupCode.cta")}
      </Text>
    </View>
  );
});

export { BackupCodeForm, BackupCodeCta };
