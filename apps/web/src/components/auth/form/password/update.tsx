"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePasswordSchema } from "@turbostarter/auth";
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

import { pathsConfig } from "~/config/paths";
import { resetPassword } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import type { UpdatePasswordPayload } from "@turbostarter/auth";

interface UpdatePasswordFormProps {
  readonly token?: string;
}

export const UpdatePasswordForm = memo<UpdatePasswordFormProps>(({ token }) => {
  const { t, errorMap } = useTranslation("auth");
  const router = useRouter();
  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema, { errorMap }),
  });

  const onSubmit = async (data: UpdatePasswordPayload) => {
    const loadingToast = toast.loading(t("account.password.update.loading"));

    await resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success(t("account.password.update.success"), {
            id: loadingToast,
          });
          router.replace(pathsConfig.auth.login);
        },
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
        },
      },
    );
  };

  return (
    <Form {...form} key="idle">
      <motion.form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-6"
        exit={{ opacity: 0 }}
      >
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Icons.Loader2 className="animate-spin" />
          ) : (
            t("account.password.update.cta")
          )}
        </Button>
      </motion.form>
    </Form>
  );
});

UpdatePasswordForm.displayName = "UpdatePasswordForm";
