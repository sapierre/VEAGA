"use client";

import { memo } from "react";

import { SocialProvider as SocialProviderType } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";

import { useAuthFormStore } from "~/components/auth/form/store";
import { pathsConfig } from "~/config/paths";
import { signIn } from "~/lib/auth/client";
import { onPromise } from "~/utils";

import type { AuthProvider } from "@turbostarter/auth";
import type { SVGProps } from "react";

interface SocialProvidersProps {
  readonly providers: SocialProviderType[];
  readonly redirectTo?: string;
}

const ICONS: Record<SocialProviderType, React.FC<SVGProps<SVGElement>>> = {
  [SocialProviderType.GITHUB]: Icons.Github,
  [SocialProviderType.GOOGLE]: Icons.Google,
};

const SocialProvider = ({
  provider,
  isSubmitting,
  onClick,
  actualProvider,
}: {
  provider: SocialProviderType;
  isSubmitting: boolean;
  onClick: () => Promise<void>;
  actualProvider: AuthProvider;
}) => {
  const Icon = ICONS[provider];

  return (
    <Button
      key={provider}
      variant="outline"
      type="button"
      size="lg"
      className="inline-flex w-full justify-center gap-2.5"
      disabled={isSubmitting}
      onClick={onPromise(onClick)}
    >
      {isSubmitting && actualProvider === provider ? (
        <Icons.Loader2 className="animate-spin" />
      ) : (
        <>
          <div className="size-5 dark:brightness-125">
            <Icon />
          </div>
          <span className="capitalize">{provider}</span>
        </>
      )}
    </Button>
  );
};

export const SocialProviders = memo<SocialProvidersProps>(
  ({ providers, redirectTo = pathsConfig.dashboard.index }) => {
    const {
      provider: actualProvider,
      setProvider,
      isSubmitting,
      setIsSubmitting,
    } = useAuthFormStore();

    const handleSignIn = async (provider: SocialProviderType) => {
      await signIn.social(
        {
          provider,
          callbackURL: redirectTo,
          errorCallbackURL: pathsConfig.auth.error,
        },
        {
          onRequest: () => {
            setProvider(provider);
            setIsSubmitting(true);
          },
          onResponse: () => {
            setIsSubmitting(false);
          },
        },
      );
    };

    return (
      <div className="flex w-full items-stretch justify-center gap-2">
        {Object.values(providers).map((provider) => (
          <SocialProvider
            key={provider}
            provider={provider}
            isSubmitting={isSubmitting}
            onClick={() => handleSignIn(provider)}
            actualProvider={actualProvider}
          />
        ))}
      </div>
    );
  },
);

SocialProviders.displayName = "SocialProviders";
