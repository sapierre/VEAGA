import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { passwordSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
  useBottomSheet,
} from "@turbostarter/ui-mobile/bottom-sheet";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import type { PasswordPayload } from "@turbostarter/auth";
import type { BottomSheetContentRef } from "@turbostarter/ui-mobile/bottom-sheet";

interface RequirePasswordProps {
  readonly title?: string;
  readonly description?: string;
  readonly cta?: string;
  readonly onConfirm: (data: PasswordPayload) => Promise<void>;
  readonly children: React.ReactNode;
  readonly ref?: React.RefObject<BottomSheetContentRef>;
}

export const RequirePassword = memo<RequirePasswordProps>(
  ({ title, description, onConfirm, cta, children, ref: passedRef }) => {
    const { t, errorMap } = useTranslation(["common", "auth"]);
    const { ref: bottomSheetRef } = useBottomSheet();

    const ref = passedRef ?? bottomSheetRef;

    const form = useForm<PasswordPayload>({
      resolver: zodResolver(passwordSchema, { errorMap }),
      defaultValues: {
        password: "",
      },
    });

    const handleSubmit = useCallback(
      async (data: PasswordPayload) => {
        await onConfirm(data);
        form.reset();
        ref.current?.close();
      },
      [onConfirm, form, ref],
    );

    return (
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>{children}</BottomSheetOpenTrigger>
        <BottomSheetContent
          ref={ref}
          stackBehavior="replace"
          name="require-password"
        >
          <BottomSheetView className="gap-4 px-6 py-4">
            <View className="gap-1 pr-2">
              <Text
                role="heading"
                aria-level={3}
                className="font-sans-medium text-2xl leading-none tracking-tight"
              >
                {title ?? t("account.password.require.title")}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {description ?? t("account.password.require.description")}
              </Text>
            </View>

            <Form {...form}>
              <View className="flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormInput
                        autoFocus
                        label={t("password")}
                        secureTextEntry
                        autoComplete="password"
                        editable={!form.formState.isSubmitting}
                        {...field}
                      />
                    </FormItem>
                  )}
                />

                <View className="mt-auto gap-2">
                  <BottomSheetCloseTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <Text>{t("cancel")}</Text>
                    </Button>
                  </BottomSheetCloseTrigger>
                  <Button
                    className="flex-1"
                    disabled={form.formState.isSubmitting}
                    onPress={form.handleSubmit(handleSubmit)}
                  >
                    {form.formState.isSubmitting ? (
                      <Icons.Loader2
                        className="animate-spin text-primary-foreground"
                        size={16}
                      />
                    ) : (
                      <Text>{cta ?? t("continue")}</Text>
                    )}
                  </Button>
                </View>
              </View>
            </Form>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
    );
  },
);

RequirePassword.displayName = "RequirePassword";
