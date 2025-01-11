"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateUserSchema } from "@turbostarter/auth";
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
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = async (data: UpdateUserPayload) => {
    await updateUser(data, {
      onSuccess: () => {
        toast.success("Name updated successfully!");
        router.refresh();
      },
      onError: ({ error }) => {
        toast.error(`${error.message}!`);
      },
    });
  };

  return (
    <Card className="h-fit w-full max-w-3xl overflow-hidden">
      <Form {...form}>
        <form onSubmit={onPromise(form.handleSubmit(onSubmit))}>
          <CardHeader>
            <CardTitle className="text-xl">Name</CardTitle>
            <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
              Please enter your full name, or a display name you are comfortable
              with.
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
            <span className="leading-tight">
              Please use 32 characters at maximum.
            </span>
            <Button size="sm" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Icons.Loader2 className="size-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
});

EditName.displayName = "EditName";
