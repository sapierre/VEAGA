"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { changePasswordSchema } from "@turbostarter/auth";
import { Trans, useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
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
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { changePassword } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import { useAccounts } from "./accounts/use-accounts";

import type { ChangePasswordPayload } from "@turbostarter/auth";

export const EditPassword = () => {
  const { t } = useTranslation(["common", "auth"]);
  const { accounts, isLoading } = useAccounts();

  const form = useForm({
    resolver: standardSchemaResolver(changePasswordSchema),
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
          toast.success(t("account.password.update.success"));
          form.reset();
        },
      },
    );
  };

  const hasPassword = accounts
    .map((account) => account.provider)
    .includes("credential");

  return (
    <Card className="h-fit w-full overflow-hidden">
      <Form {...form}>
        <form onSubmit={onPromise(form.handleSubmit(onSubmit))}>
          <CardHeader>
            <CardTitle className="text-xl">{t("password")}</CardTitle>
            <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
              {t("account.password.update.description")}
            </CardDescription>

            {isLoading && <Skeleton className="mt-0 h-20" />}

            {!isLoading &&
              (hasPassword ? (
                <div className="flex w-full flex-wrap gap-3 lg:gap-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-xs space-y-1">
                        <FormLabel>{t("currentPassword")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-xs space-y-1">
                        <FormLabel>{t("newPassword")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="flex w-full items-center justify-center rounded-md border border-dashed p-6">
                  <p className="text-center">
                    <Trans
                      i18nKey="account.password.update.noPassword"
                      ns="auth"
                      components={{
                        bold: (
                          <TurboLink
                            href={pathsConfig.auth.forgotPassword}
                            className="font-bold underline hover:no-underline"
                          />
                        ),
                      }}
                    />
                  </p>
                </div>
              ))}
          </CardHeader>

          <CardFooter className="flex min-h-14 justify-between gap-10 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
            <span className="leading-tight">
              {t("account.password.update.info")}
            </span>
            {!isLoading && hasPassword && (
              <Button size="sm" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Icons.Loader2 className="size-4 animate-spin" />
                ) : (
                  t("save")
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
