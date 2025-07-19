"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { passwordSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { useBreakpoint } from "@turbostarter/ui-web";
import { Button } from "@turbostarter/ui-web/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@turbostarter/ui-web/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@turbostarter/ui-web/drawer";
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

import { onPromise } from "~/utils";

import type { PasswordPayload } from "@turbostarter/auth";
import type { ComponentProps } from "react";
import type { UseFormReturn } from "react-hook-form";

interface PasswordFormProps {
  readonly form: UseFormReturn<PasswordPayload>;
  readonly onSubmit: (data: PasswordPayload) => Promise<void>;
  readonly children: React.ReactNode;
}

const PasswordForm = memo<PasswordFormProps>(({ form, onSubmit, children }) => {
  const { t } = useTranslation(["common", "auth"]);

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full space-y-1 px-6 md:px-0">
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
});

PasswordForm.displayName = "PasswordForm";

interface RequirePasswordProps extends ComponentProps<typeof Dialog> {
  readonly title?: string;
  readonly description?: string;
  readonly cta?: string;
  readonly onConfirm: (data: PasswordPayload) => Promise<void>;
}

export const RequirePassword = memo<RequirePasswordProps>(
  ({
    title,
    description,
    onConfirm,
    cta,
    children,
    open: _open,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onOpenChange: _onOpenChange,
    ...props
  }) => {
    const [open, setOpen] = useState(_open ?? false);
    const { t, errorMap } = useTranslation(["common", "auth"]);
    const isDesktop = useBreakpoint("md");

    const form = useForm({
      resolver: zodResolver(passwordSchema, { errorMap }),
      defaultValues: {
        password: "",
      },
    });

    const onSubmit = async (data: PasswordPayload) => {
      try {
        if (document.activeElement && "blur" in document.activeElement) {
          (document.activeElement as HTMLElement).blur();
        }
        await onConfirm(data);
        form.reset();
        setOpen(false);
      } catch (error) {
        setTimeout(() => form.setFocus("password"), 0);
        throw error;
      }
    };

    const onOpenChange = useCallback(
      (open: boolean) => {
        setOpen(open);
        _onOpenChange?.(open);
      },
      [_onOpenChange, setOpen],
    );

    useEffect(() => {
      setOpen(_open ?? false);
    }, [_open]);

    if (isDesktop) {
      return (
        <Dialog {...props} open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {title ?? t("account.password.require.title")}
              </DialogTitle>
              <DialogDescription className="whitespace-pre-line">
                {description ?? t("account.password.require.description")}
              </DialogDescription>
            </DialogHeader>
            <PasswordForm form={form} onSubmit={onSubmit}>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    {t("cancel")}
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Icons.Loader2 className="size-4 animate-spin" />
                  ) : (
                    (cta ?? t("continue"))
                  )}
                </Button>
              </DialogFooter>
            </PasswordForm>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer {...props} open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="pb-4">
            <DrawerTitle>
              {title ?? t("account.password.require.title")}
            </DrawerTitle>
            <DrawerDescription className="whitespace-pre-line">
              {description ?? t("account.password.require.description")}
            </DrawerDescription>
          </DrawerHeader>
          <PasswordForm form={form} onSubmit={onSubmit}>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" type="button">
                  {t("cancel")}
                </Button>
              </DrawerClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Icons.Loader2 className="size-4 animate-spin" />
                ) : (
                  (cta ?? t("continue"))
                )}
              </Button>
            </DrawerFooter>
          </PasswordForm>
        </DrawerContent>
      </Drawer>
    );
  },
);

RequirePassword.displayName = "RequirePassword";
