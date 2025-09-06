"use client";

import { router } from "expo-router";

import { AuthProvider } from "@turbostarter/auth";
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
        setProvider(AuthProvider.ANONYMOUS);
        setIsSubmitting(true);
      },
      onResponse: () => {
        setIsSubmitting(false);
      },
      onSuccess: () => {
        router.navigate(pathsConfig.index);
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
      {isSubmitting && provider === AuthProvider.ANONYMOUS ? (
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
