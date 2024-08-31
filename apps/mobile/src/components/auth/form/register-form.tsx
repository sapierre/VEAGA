import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { registerSchema } from "@turbostarter/shared/validators";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormItem,
  FormInput,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth";

import type { RegisterData } from "@turbostarter/shared/validators";

export const RegisterForm = memo(() => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterData) => auth().signUp(data),
    onSettled: (data) => {
      const error = data?.error;

      if (error) {
        return Alert.alert("Something went wrong!", error.message);
      }

      Alert.alert(
        "Success!",
        "You have successfully registered! Check your email to verify your account.",
        [
          {
            text: "OK",
            onPress: () => router.navigate(pathsConfig.tabs.auth.login),
          },
        ],
      );
    },
  });

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    mutate(data);
  };

  return (
    <Form {...form} key="idle">
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
              <FormInput
                label="Password"
                secureTextEntry
                autoComplete="password"
                {...field}
              />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>Sign up</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <View className="flex-row">
            <Text className="text-sm text-muted-foreground">
              Already have an account?
            </Text>
            <Link
              href={pathsConfig.tabs.auth.login}
              className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
            >
              Sign in!
            </Link>
          </View>
        </View>
      </View>
    </Form>
  );
});

RegisterForm.displayName = "RegisterForm";
