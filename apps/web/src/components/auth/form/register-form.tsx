"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthProvider, registerSchema, generateName } from "@turbostarter/auth";
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
import { signUp } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import { useAuthFormStore } from "./store";

import type { RegisterPayload } from "@turbostarter/auth";

export const RegisterForm = memo(() => {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema, { errorMap }),
  });

  const onSubmit = async (data: RegisterPayload) => {
    const loadingToast = toast.loading(t("register.loading"));
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: generateName(data.email),
        callbackURL: pathsConfig.dashboard.index,
      },
      {
        onRequest: () => {
          setProvider(AuthProvider.PASSWORD);
          setIsSubmitting(true);
        },
        onSuccess: () => {
          toast.success(t("register.success.notification"), {
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
    <AnimatePresence mode="wait">
      {form.formState.isSubmitSuccessful ? (
        <motion.div
          className="my-6 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="success"
        >
          <Icons.CheckCircle2
            className="h-20 w-20 text-success"
            strokeWidth={1.2}
          />
          <h2 className="text-center text-2xl font-semibold">
            {t("register.success.title")}
          </h2>
          <p className="text-center">{t("register.success.description")}</p>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={form.formState.isSubmitting}
                      autoComplete="new-password"
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
              disabled={isSubmitting}
            >
              {isSubmitting && provider === AuthProvider.PASSWORD ? (
                <Icons.Loader2 className="animate-spin" />
              ) : (
                t("register.cta")
              )}
            </Button>
          </motion.form>
        </Form>
      )}
    </AnimatePresence>
  );
});

RegisterForm.displayName = "RegisterForm";

export const RegisterCta = () => {
  const { t } = useTranslation("auth");
  return (
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
  );
};
