"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { forgotPasswordSchema } from "@turbostarter/auth";
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

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { forgetPassword } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import type { ForgotPasswordPayload } from "@turbostarter/auth";

type Status = "pending" | "success" | "error" | "idle";

export const ForgotPasswordForm = memo(() => {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const [status, setStatus] = useState<Status>("idle");
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema, { errorMap }),
  });

  const onSubmit = async (data: ForgotPasswordPayload) => {
    const loadingToast = toast.loading(t("account.password.forgot.loading"));
    await forgetPassword(
      {
        ...data,
        redirectTo: pathsConfig.auth.updatePassword,
      },
      {
        onRequest: () => {
          setStatus("pending");
        },
        onSuccess: () => {
          toast.success(t("account.password.forgot.success.notification"), {
            id: loadingToast,
          });
          setStatus("success");
        },
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
          setStatus("error");
        },
      },
    );
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          className="mt-6 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="success"
        >
          <Icons.CheckCircle2
            className="h-20 w-20 text-success"
            strokeWidth={1.2}
          />
          <h2 className="text-center text-2xl font-semibold">
            {t("account.password.forgot.success.title")}
          </h2>
          <p className="text-center">
            {t("account.password.forgot.success.description")}
          </p>
          <TurboLink
            href={pathsConfig.auth.login}
            className="-mt-1 text-sm text-muted-foreground underline hover:no-underline"
          >
            {t("login.cta")}
          </TurboLink>
        </motion.div>
      ) : (
        <Form {...form} key="idle">
          <motion.form
            onSubmit={onPromise(form.handleSubmit(onSubmit))}
            className="space-y-6"
            exit={{ opacity: 0 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={form.formState.isSubmitting}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
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
                t("account.password.forgot.cta")
              )}
            </Button>

            <div className="flex items-center justify-center pt-2">
              <TurboLink
                href={pathsConfig.auth.login}
                className="pl-2 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                {t("account.password.forgot.back")}
              </TurboLink>
            </div>
          </motion.form>
        </Form>
      )}
    </AnimatePresence>
  );
});

ForgotPasswordForm.displayName = "ForgotPasswordForm";
