"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateUserSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
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
  FormMessage,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import { Input } from "@turbostarter/ui-web/input";

import { updateUser } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import type { User, UpdateUserPayload } from "@turbostarter/auth";

interface EditNameProps {
  readonly user: User;
}

export const EditName = memo<EditNameProps>(({ user }) => {
  const { t } = useTranslation(["common", "auth"]);
  const router = useRouter();
  const form = useForm({
    resolver: standardSchemaResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = async (data: UpdateUserPayload) => {
    await updateUser(data, {
      onSuccess: () => {
        toast.success(t("account.name.edit.success"));
        router.refresh();
      },
    });
  };

  return (
    <Card className="h-fit w-full overflow-hidden">
      <Form {...form}>
        <form onSubmit={onPromise(form.handleSubmit(onSubmit))}>
          <CardHeader>
            <CardTitle className="text-xl">{t("name")}</CardTitle>
            <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
              {t("account.name.edit.description")}
            </CardDescription>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={form.formState.isSubmitting}
                      className="max-w-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>

          <CardFooter className="flex min-h-14 justify-between gap-10 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
            <span className="leading-tight">{t("account.name.edit.info")}</span>
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

EditName.displayName = "EditName";
