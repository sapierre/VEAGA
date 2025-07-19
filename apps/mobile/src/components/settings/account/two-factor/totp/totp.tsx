import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import QRCode from "react-qr-code";

import { otpSchema } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetView,
  useBottomSheet,
} from "@turbostarter/ui-mobile/bottom-sheet";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@turbostarter/ui-mobile/input-otp";
import { Text } from "@turbostarter/ui-mobile/text";

import { useCopyToClipboard } from "~/lib/hooks/use-copy-to-clipboard";
import { useTheme } from "~/lib/hooks/use-theme";

import { BackupCodesSheet } from "../backup-codes/backup-codes";
import { RequirePassword } from "../require-password";
import { useTwoFactor } from "../use-two-factor";

import { useTotp } from "./use-totp";

import type { OtpPayload, PasswordPayload } from "@turbostarter/auth";
import type { BottomSheetContentRef } from "@turbostarter/ui-mobile/bottom-sheet";

interface TotpSheetProps {
  readonly ref?: React.RefObject<BottomSheetContentRef | null>;
}

export const TotpSheet = ({ ref: passedRef }: TotpSheetProps) => {
  const { resolvedTheme } = useTheme();
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const { ref: totpSheetRef } = useBottomSheet();
  const { ref: backupCodesRef } = useBottomSheet();
  const ref = passedRef ?? totpSheetRef;

  const { uri, verify } = useTotp();
  const form = useForm<OtpPayload>({
    resolver: zodResolver(otpSchema, { errorMap }),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: OtpPayload) => {
    await verify.mutateAsync(data);
    ref.current?.dismiss();
    backupCodesRef.current?.present();
  };

  return (
    <>
      <BottomSheet>
        <BottomSheetContent ref={ref} stackBehavior="replace" name="totp">
          <BottomSheetView className="gap-6 px-6 py-4">
            <View className="gap-1">
              <Text
                role="heading"
                aria-level={3}
                className="font-sans-medium text-2xl leading-none tracking-tight"
              >
                {t("account.twoFactor.totp.enable.title")}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {t("account.twoFactor.totp.enable.description")}
              </Text>
            </View>

            <View className="w-full flex-1 items-center gap-4">
              <Secret />

              <QRCode
                value={uri}
                size={180}
                bgColor="transparent"
                fgColor={resolvedTheme === "dark" ? "#fff" : "#000"}
              />

              <Form {...form}>
                <View className="w-full flex-1 items-center gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <InputOTP
                          maxLength={6}
                          autoFocus
                          value={field.value}
                          onChange={field.onChange}
                          onComplete={() => form.handleSubmit(onSubmit)()}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot
                                  key={index}
                                  index={index}
                                  max={6}
                                  {...slot}
                                />
                              ))}
                            </InputOTPGroup>
                          )}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <View className="mt-auto w-full gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onPress={() => ref.current?.close()}
                    >
                      <Text>{t("close")}</Text>
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={form.formState.isSubmitting}
                      onPress={form.handleSubmit(onSubmit)}
                    >
                      {form.formState.isSubmitting ? (
                        <Icons.Loader2
                          className="animate-spin text-primary-foreground"
                          size={16}
                        />
                      ) : (
                        <Text>{t("continue")}</Text>
                      )}
                    </Button>
                  </View>
                </View>
              </Form>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      <BackupCodesSheet ref={backupCodesRef} />
    </>
  );
};

const Secret = () => {
  const { uri } = useTotp();
  const [, copy] = useCopyToClipboard();
  const [showCheck, setShowCheck] = useState(false);
  const secret = useMemo(() => {
    return uri ? new URL(uri).searchParams.get("secret") : null;
  }, [uri]);

  const handleCopy = async () => {
    const success = await copy(secret ?? "");
    if (!success) {
      return;
    }

    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 2000);
  };

  return (
    <View className="mb-2 flex-row flex-wrap items-center gap-2 px-5">
      <Text>
        <Text className="text-center text-muted-foreground">{secret}</Text>

        <Text
          onPress={handleCopy}
          style={{
            marginLeft: 10,
          }}
        >
          {showCheck ? (
            <Icons.Check className="text-foreground" size={12} />
          ) : (
            <Icons.Copy className="text-foreground" size={12} />
          )}
        </Text>
        {/* <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onPress={handleCopy}
        >
          
        </Button> */}
      </Text>
    </View>
  );
};

export const TotpTile = () => {
  const { ref } = useBottomSheet();
  const { t } = useTranslation(["common", "auth"]);
  const { enabled } = useTwoFactor();

  const { setUri, getUri } = useTotp();

  const onEdit = async (data: PasswordPayload) => {
    const response = await getUri.mutateAsync(data);
    setUri(response.totpURI);
    ref.current?.present();
  };

  return (
    <>
      <View className="flex-row items-center justify-between gap-4 rounded-md border border-border p-4">
        <View className="flex-1">
          <Text className="text-sm font-medium">
            {t("account.twoFactor.totp.title")}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {t("account.twoFactor.totp.description")}
          </Text>
        </View>

        <RequirePassword onConfirm={onEdit}>
          <Button variant="outline" disabled={!enabled}>
            <Text>{enabled ? t("edit") : t("add")}</Text>
          </Button>
        </RequirePassword>
      </View>
      <TotpSheet ref={ref} />
    </>
  );
};
