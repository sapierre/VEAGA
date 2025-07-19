"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthProvider } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";

import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth/client";

import { useAuthFormStore } from "../store";

interface PasskeyLoginProps {
  readonly redirectTo?: string;
}

export const PasskeyLogin = ({
  redirectTo = pathsConfig.dashboard.index,
}: PasskeyLoginProps) => {
  const router = useRouter();
  const { setProvider, setIsSubmitting, isSubmitting, provider } =
    useAuthFormStore();
  const { t } = useTranslation("auth");

  useEffect(() => {
    void signIn.passkey({ autoFill: true });
  }, []);

  const handleSignIn = async () => {
    await signIn.passkey({
      fetchOptions: {
        onRequest: () => {
          setProvider(AuthProvider.PASSKEY);
          setIsSubmitting(true);
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
        onSuccess: () => {
          router.replace(redirectTo);
        },
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      size="lg"
      onClick={handleSignIn}
      disabled={isSubmitting}
    >
      {isSubmitting && provider === AuthProvider.PASSKEY ? (
        <Icons.Loader className="size-4 animate-spin" />
      ) : (
        <>
          <Icons.Key className="size-4" />
          {t("login.passkey.cta")}
        </>
      )}
    </Button>
  );
};
