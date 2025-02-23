"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_PROVIDER, passwordLoginSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
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

import { useAuthFormStore } from "~/components/auth/form/store";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import type { PasswordLoginPayload } from "@turbostarter/auth";

interface PasswordLoginFormProps {
  readonly redirectTo?: string;
}

export const PasswordLoginForm = memo<PasswordLoginFormProps>(
  ({ redirectTo = pathsConfig.dashboard.index }) => {
    const { t, errorMap } = useTranslation(["common", "auth"]);
    const { provider, setProvider, isSubmitting, setIsSubmitting } =
      useAuthFormStore();
    const form = useForm<PasswordLoginPayload>({
      resolver: zodResolver(passwordLoginSchema, { errorMap }),
    });

    const onSubmit = async (data: PasswordLoginPayload) => {
      const loadingToast = toast.loading(t("login.password.loading"));
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: redirectTo,
        },
        {
          onRequest: () => {
            setProvider(AUTH_PROVIDER.PASSWORD);
            setIsSubmitting(true);
          },
          onSuccess: () => {
            toast.success(t("login.password.success"), {
              id: loadingToast,
            });
          },
          onError: ({ error }) => {
            toast.error(error.message, { id: loadingToast });
          },
          onResponse: () => {
            setIsSubmitting(false);
          },
        },
      );
    };

    return (
      <Form {...form}>
        <form
          onSubmit={onPromise(form.handleSubmit(onSubmit))}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common:email")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-between">
                  <FormLabel>{t("password")}</FormLabel>
                  <TurboLink
                    href={pathsConfig.auth.forgotPassword}
                    className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                  >
                    {t("account.password.forgot.label")}
                  </TurboLink>
                </div>
                <FormControl>
                  <Input {...field} type="password" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting && provider === AUTH_PROVIDER.PASSWORD ? (
              <Icons.Loader2 className="animate-spin" />
            ) : (
              t("login.cta")
            )}
          </Button>

          <div className="flex items-center justify-center pt-2">
            <div className="text-sm text-muted-foreground">
              {t("login.noAccount")}
              <TurboLink
                href={pathsConfig.auth.register}
                className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
              >
                {t("register.cta")}
              </TurboLink>
            </div>
          </div>
        </form>
      </Form>
    );
  },
);

PasswordLoginForm.displayName = "PasswordLoginForm";
