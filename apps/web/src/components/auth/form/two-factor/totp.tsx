"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { otpVerificationSchema, SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import { Checkbox } from "@turbostarter/ui-web/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@turbostarter/ui-web/input-otp";

import { pathsConfig } from "~/config/paths";
import { twoFactor } from "~/lib/auth/client";

import type { CtaProps, FormProps } from ".";
import type { OtpVerificationPayload } from "@turbostarter/auth";

const TotpForm = memo<FormProps>(
  ({ redirectTo = pathsConfig.dashboard.index }) => {
    const router = useRouter();
    const { t, errorMap } = useTranslation(["common", "auth"]);

    const form = useForm<OtpVerificationPayload>({
      resolver: zodResolver(otpVerificationSchema, { errorMap }),
      defaultValues: {
        code: "",
        trustDevice: false,
      },
    });

    const onSubmit = async (data: OtpVerificationPayload) => {
      const loadingToast = toast.loading(t("login.twoFactor.totp.loading"));
      await twoFactor.verifyTotp(data, {
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
        },
        onSuccess: () => {
          toast.success(t("login.twoFactor.totp.success"), {
            id: loadingToast,
          });
          router.replace(redirectTo);
        },
      });
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    autoFocus
                    disabled={form.formState.isSubmitting}
                    onComplete={form.handleSubmit(onSubmit)}
                    {...field}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trustDevice"
            render={({ field }) => (
              <FormItem className="-mt-2 ml-px flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t("login.twoFactor.trustDevice")}</FormLabel>
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
              t("verify")
            )}
          </Button>
        </form>
      </Form>
    );
  },
);

const TotpCta = memo<CtaProps>(({ onFactorChange }) => {
  const { t } = useTranslation(["auth"]);
  return (
    <div className="flex items-center justify-center pt-2">
      <span
        role="link"
        onClick={() => onFactorChange(SecondFactor.TOTP)}
        className="cursor-pointer pl-2 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-primary"
      >
        {t("login.twoFactor.totp.cta")}
      </span>
    </div>
  );
});

export { TotpForm, TotpCta };
