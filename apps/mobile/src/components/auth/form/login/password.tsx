import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { AuthProvider } from "@turbostarter/auth";
import { passwordLoginSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormCheckbox,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useAuthFormStore } from "~/components/auth/form/store";
import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth";

import type { PasswordLoginPayload } from "@turbostarter/auth";

interface PasswordLoginFormProps {
  readonly onTwoFactorRedirect?: () => void;
}

export const PasswordLoginForm = memo<PasswordLoginFormProps>(
  ({ onTwoFactorRedirect }) => {
    const { t, errorMap } = useTranslation(["common", "auth"]);
    const { provider, setProvider, isSubmitting, setIsSubmitting } =
      useAuthFormStore();
    const form = useForm<PasswordLoginPayload>({
      resolver: zodResolver(passwordLoginSchema, { errorMap }),
      defaultValues: {
        rememberMe: true,
      },
    });

    const onSubmit = async (data: PasswordLoginPayload) => {
      await signIn.email(data, {
        onRequest: () => {
          setProvider(AuthProvider.PASSWORD);
          setIsSubmitting(true);
        },
        onSuccess: (ctx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (ctx.data.twoFactorRedirect) {
            return onTwoFactorRedirect?.();
          }
          router.navigate(pathsConfig.tabs.settings.index);
          form.reset();
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
      });
    };

    return (
      <Form {...form}>
        <View className="gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormInput
                  label={t("email")}
                  autoCapitalize="none"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <View className="flex-row items-center justify-between">
                  <FormLabel nativeID="password">{t("password")}</FormLabel>

                  <Link
                    href={pathsConfig.tabs.auth.forgotPassword}
                    className="text-muted-foreground underline"
                  >
                    {t("account.password.forgot.label")}
                  </Link>
                </View>
                <FormInput secureTextEntry autoComplete="password" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormCheckbox
                className="-ml-0.5 -mt-2"
                name="rememberMe"
                label={t("rememberMe")}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <Button
            className="w-full"
            size="lg"
            onPress={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting && provider === AuthProvider.PASSWORD ? (
              <Icons.Loader2 className="animate-spin text-primary-foreground" />
            ) : (
              <Text>{t("login.cta")}</Text>
            )}
          </Button>
        </View>
      </Form>
    );
  },
);

PasswordLoginForm.displayName = "PasswordLoginForm";
