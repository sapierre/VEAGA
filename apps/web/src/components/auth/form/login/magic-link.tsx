"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  AuthProvider,
  generateName,
  magicLinkLoginSchema,
} from "@turbostarter/auth";
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
import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import type { MagicLinkLoginPayload } from "@turbostarter/auth";

interface MagicLinkLoginFormProps {
  readonly redirectTo?: string;
}

export const MagicLinkLoginForm = memo<MagicLinkLoginFormProps>(
  ({ redirectTo = pathsConfig.dashboard.index }) => {
    const { t, errorMap } = useTranslation(["common", "auth"]);
    const { provider, setProvider, isSubmitting, setIsSubmitting } =
      useAuthFormStore();

    const form = useForm<MagicLinkLoginPayload>({
      resolver: zodResolver(magicLinkLoginSchema, { errorMap }),
    });

    const onSubmit = async (data: MagicLinkLoginPayload) => {
      const loadingToast = toast.loading(t("login.magicLink.loading"));

      await signIn.magicLink(
        {
          name: generateName(data.email),
          email: data.email,
          callbackURL: redirectTo,
        },
        {
          onRequest: () => {
            setProvider(AuthProvider.MAGIC_LINK);
            setIsSubmitting(true);
          },
          onSuccess: () => {
            toast.success(t("login.magicLink.success.notification"), {
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
              {t("login.magicLink.success.title")}
            </h2>
            <p className="text-center">
              {t("login.magicLink.success.description")}
            </p>
          </motion.div>
        ) : (
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
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        disabled={form.formState.isSubmitting}
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
                {isSubmitting && provider === AuthProvider.MAGIC_LINK ? (
                  <Icons.Loader2 className="animate-spin" />
                ) : (
                  t("login.magicLink.cta")
                )}
              </Button>
            </form>
          </Form>
        )}
      </AnimatePresence>
    );
  },
);

MagicLinkLoginForm.displayName = "MagicLinkLoginForm";
