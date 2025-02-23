import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { updateUserSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormItem,
  FormInput,
  FormDescription,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { updateUser, useSession } from "~/lib/auth";

import type { UpdateUserPayload } from "@turbostarter/auth";

const EditName = memo(() => {
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const { data } = useSession();

  const form = useForm({
    resolver: zodResolver(updateUserSchema, { errorMap }),
    defaultValues: {
      name: data?.user.name ?? "",
    },
  });

  const onSubmit = async (data: UpdateUserPayload) => {
    await updateUser(data, {
      onSuccess: () => {
        router.back();
      },
      onError: ({ error }) => {
        Alert.alert(t("error.title"), error.message);
      },
    });
  };

  return (
    <View className="flex-1 bg-background p-6">
      <Form {...form}>
        <View className="flex-1 gap-6">
          <View className="gap-2">
            <Text className="text-base font-medium text-muted-foreground">
              {t("auth:account.name.edit.description")}
            </Text>
          </View>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormInput
                  label={t("name")}
                  autoCapitalize="words"
                  autoComplete="name"
                  editable={!form.formState.isSubmitting}
                  {...field}
                />

                <FormDescription>
                  {t("auth:account.name.edit.info")}
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            size="lg"
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Icons.Loader2 className="animate-spin text-primary-foreground" />
            ) : (
              <Text>{t("save")}</Text>
            )}
          </Button>
        </View>
      </Form>
    </View>
  );
});

EditName.displayName = "EditName";

export default EditName;
