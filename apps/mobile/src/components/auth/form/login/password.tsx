import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { passwordLoginSchema } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
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

export const PasswordLoginForm = memo(() => {
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const form = useForm<PasswordLoginPayload>({
    resolver: zodResolver(passwordLoginSchema),
  });

  const onSubmit = async (data: PasswordLoginPayload) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setProvider(AUTH_PROVIDER.PASSWORD);
          setIsSubmitting(true);
        },
        onSuccess: () => {
          router.navigate(pathsConfig.tabs.settings);
          form.reset();
        },
        onError: ({ error }) => {
          Alert.alert("Something went wrong!", error.message);
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
      },
    );
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
                label="Email"
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
                <FormLabel nativeID="password">Password</FormLabel>

                <Link
                  href={pathsConfig.tabs.auth.forgotPassword}
                  className="text-muted-foreground underline"
                >
                  Forgot password?
                </Link>
              </View>
              <FormInput secureTextEntry autoComplete="password" {...field} />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting && provider === AUTH_PROVIDER.PASSWORD ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>Sign in</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <View className="flex-row">
            <Text className="text-sm text-muted-foreground">
              Don&apos;t have an account yet?
            </Text>
            <Link
              href={pathsConfig.tabs.auth.register}
              className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
            >
              Sign up!
            </Link>
          </View>
        </View>
      </View>
    </Form>
  );
});

PasswordLoginForm.displayName = "PasswordLoginForm";
