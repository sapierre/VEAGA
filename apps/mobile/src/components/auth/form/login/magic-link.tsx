import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { magicLinkLoginSchema } from "@turbostarter/shared/validators";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

import type { MagicLinkLoginData } from "@turbostarter/shared/validators";

export const MagicLinkLoginForm = memo(() => {
  const form = useForm<MagicLinkLoginData>({
    resolver: zodResolver(magicLinkLoginSchema),
  });

  const onSubmit = (data: MagicLinkLoginData) => {
    console.log(data);
    // setProvider(AUTH_PROVIDER.MAGIC_LINK);
    // setStatus("pending");
    // const loadingToast = toast.loading("Sending link...");
    // const { error } = await login({ data, option: AUTH_PROVIDER.MAGIC_LINK });
    // if (error) {
    //   setStatus("error");
    //   return toast.error(`${error}!`, { id: loadingToast });
    // }
    // toast.success("Success! Now check your inbox!", {
    //   id: loadingToast,
    // });
    // setStatus("success");
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
                {...field}
              />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text>Send magic link</Text>
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

MagicLinkLoginForm.displayName = "MagicLinkLoginForm";
