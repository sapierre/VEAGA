"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { emailSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Badge } from "@turbostarter/ui-web/badge";
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
  FormMessage,
  FormField,
  FormControl,
  FormItem,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import { Input } from "@turbostarter/ui-web/input";

import { pathsConfig } from "~/config/paths";
import { changeEmail, sendVerificationEmail } from "~/lib/auth/client";

import type { User, EmailPayload } from "@turbostarter/auth";

interface EditEmailProps {
  readonly user: User;
}

export const EditEmail = memo<EditEmailProps>(({ user }) => {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const form = useForm<EmailPayload>({
    resolver: zodResolver(emailSchema, { errorMap }),
    defaultValues: {
      email: user.email,
    },
  });

  const sendVerification = useMutation({
    mutationFn: () =>
      sendVerificationEmail(
        {
          email: user.email,
          callbackURL: pathsConfig.dashboard.settings.index,
        },
        {
          onSuccess: () => {
            toast.success(t("account.email.confirm.email.sent"));
          },
          onError: ({ error }) => {
            toast.error(error.message);
          },
        },
      ),
  });

  const onSubmit = async (data: EmailPayload) => {
    await changeEmail(
      {
        newEmail: data.email,
        callbackURL: pathsConfig.dashboard.settings.index,
      },
      {
        onSuccess: () => {
          toast.success(t("account.email.change.success"));
        },
        onError: ({ error }) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Card className="h-fit w-full max-w-3xl overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl">{t("email")}</CardTitle>
              <Badge
                className={cn({
                  "bg-success/15 text-success hover:bg-success/25":
                    user.emailVerified,
                  "bg-destructive/15 text-destructive hover:bg-destructive/25":
                    !user.emailVerified,
                })}
              >
                {user.emailVerified ? t("verified") : t("unverified")}
              </Badge>
              {!user.emailVerified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sendVerification.mutate()}
                  disabled={sendVerification.isPending}
                  type="button"
                  className="h-auto py-1 text-xs"
                >
                  {sendVerification.isPending
                    ? t("account.email.confirm.loading")
                    : t("account.email.confirm.cta")}
                </Button>
              )}
            </div>

            <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
              {t("account.email.change.description")}
            </CardDescription>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="max-w-xs"
                      placeholder="john@doe.com"
                      disabled={form.formState.isSubmitting}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>

          <CardFooter className="min-h-14 justify-between gap-10 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
            <span className="leading-tight">
              {t("account.email.change.info")}
            </span>
            <Button size="sm" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Icons.Loader2 className="size-4 animate-spin" />
              ) : (
                t("save")
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
});

EditEmail.displayName = "EditEmail";
