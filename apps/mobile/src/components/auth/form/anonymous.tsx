"use client";

import { router } from "expo-router";
import { Alert } from "react-native";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth";

import { useAuthFormStore } from "./store";

export const AnonymousLogin = () => {
  const { t } = useTranslation(["auth", "common"]);
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();

  const handleSignIn = async () => {
    await signIn.anonymous(undefined, {
      onRequest: () => {
        setProvider(AUTH_PROVIDER.ANONYMOUS);
        setIsSubmitting(true);
      },
      onResponse: () => {
        setIsSubmitting(false);
      },
      onError: ({ error }) => {
        Alert.alert(t("error.title"), error.message);
      },
      onSuccess: () => {
        router.navigate(pathsConfig.tabs.settings.index);
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex-row gap-2"
      size="lg"
      disabled={isSubmitting}
      onPress={handleSignIn}
    >
      {isSubmitting && provider === AUTH_PROVIDER.ANONYMOUS ? (
        <Icons.Loader2 className="animate-spin text-foreground" size={16} />
      ) : (
        <>
          <Icons.UserRound className="text-foreground" size={16} />
          <Text>{t("login.anonymous.cta")}</Text>
        </>
      )}
    </Button>
  );
};
