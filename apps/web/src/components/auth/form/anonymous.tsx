"use client";

import { useRouter } from "next/navigation";

import { AuthProvider } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";

import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth/client";

import { useAuthFormStore } from "./store";

interface AnonymousLoginProps {
  readonly redirectTo?: string;
}

export const AnonymousLogin = ({
  redirectTo = pathsConfig.dashboard.index,
}: AnonymousLoginProps) => {
  const router = useRouter();
  const { t } = useTranslation("auth");
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
        router.replace(redirectTo);
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      size="lg"
      type="button"
      disabled={isSubmitting}
      onClick={handleSignIn}
    >
      {isSubmitting && provider === AuthProvider.ANONYMOUS ? (
        <Icons.Loader2 className="animate-spin" />
      ) : (
        <>
          <Icons.UserRound className="size-4" />
          {t("login.anonymous.cta")}
        </>
      )}
    </Button>
  );
};
