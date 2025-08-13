"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { backupCodeVerificationSchema, SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import { Checkbox } from "@turbostarter/ui-web/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import { Input } from "@turbostarter/ui-web/input";

import { pathsConfig } from "~/config/paths";
import { twoFactor } from "~/lib/auth/client";

import type { CtaProps, FormProps } from ".";
import type { BackupCodeVerificationPayload } from "@turbostarter/auth";

const BackupCodeForm = memo<FormProps>(
  ({ redirectTo = pathsConfig.dashboard.index }) => {
    const router = useRouter();
    const { t } = useTranslation(["common", "auth"]);
    const form = useForm({
      resolver: standardSchemaResolver(backupCodeVerificationSchema),
      defaultValues: {
        code: "",
        trustDevice: false,
      },
    });

    const onSubmit = async (data: BackupCodeVerificationPayload) => {
      const loadingToast = toast.loading(
        t("login.twoFactor.backupCode.loading"),
      );
      await twoFactor.verifyBackupCode(data, {
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
        },
        onSuccess: () => {
          toast.success(t("login.twoFactor.backupCode.success"), {
            id: loadingToast,
          });
          router.replace(redirectTo);
        },
      });
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    autoFocus
                    disabled={form.formState.isSubmitting}
                    autoComplete="one-time-code"
                    placeholder={t("login.twoFactor.backupCode.placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trustDevice"
            render={({ field }) => (
              <FormItem className="-mt-2 ml-px flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t("login.twoFactor.trustDevice")}</FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Icons.Loader2 className="animate-spin" />
            ) : (
              t("verify")
            )}
          </Button>
        </form>
      </Form>
    );
  },
);

const BackupCodeCta = memo<CtaProps>(({ onFactorChange }) => {
  const { t } = useTranslation(["auth"]);
  return (
    <div className="flex items-center justify-center pt-2">
      <span
        role="link"
        onClick={() => onFactorChange(SecondFactor.BACKUP_CODE)}
        className="cursor-pointer pl-2 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-primary"
      >
        {t("login.twoFactor.backupCode.cta")}
      </span>
    </div>
  );
});

export { BackupCodeForm, BackupCodeCta };
