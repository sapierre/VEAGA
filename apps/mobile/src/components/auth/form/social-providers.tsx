import { router } from "expo-router";
import { memo } from "react";
import { View } from "react-native";

import { SocialProvider as SocialProviderType } from "@turbostarter/auth";
import { Trans } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useAuthFormStore } from "~/components/auth/form/store";
import { pathsConfig } from "~/config/paths";
import { getSession, signIn } from "~/lib/auth";

import type { AuthProvider } from "@turbostarter/auth";
import type { SVGProps } from "react";

interface SocialProvidersProps {
  readonly providers: SocialProviderType[];
}

const ICONS: Record<SocialProviderType, React.FC<SVGProps<SVGElement>>> = {
  [SocialProviderType.GITHUB]: Icons.Github,
  [SocialProviderType.GOOGLE]: Icons.Google,
};

const SocialProvider = ({
  provider,
  onClick,
  actualProvider,
  isSubmitting,
}: {
  provider: SocialProviderType;
  isSubmitting: boolean;
  onClick: () => void;
  actualProvider: AuthProvider;
}) => {
  const Icon = ICONS[provider];

  return (
    <Button
      key={provider}
      variant="outline"
      size="lg"
      className="w-full flex-row justify-center gap-2.5"
      onPress={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting && actualProvider === provider ? (
        <Icons.Loader2 className="size-5 animate-spin text-foreground" />
      ) : (
        <>
          <View className="h-6 w-6 dark:brightness-125">
            <Icon className="text-foreground" />
          </View>
          <Text>
            <Trans
              ns="auth"
              i18nKey="login.social"
              values={{ provider }}
              components={{
                capitalize: <Text className="capitalize" />,
              }}
            />
          </Text>
        </>
      )}
    </Button>
  );
};

export const SocialProviders = memo<SocialProvidersProps>(({ providers }) => {
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
        callbackURL: pathsConfig.index,
        errorCallbackURL: pathsConfig.setup.auth.error,
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

    const session = await getSession();

    if (session.data) {
      router.navigate(pathsConfig.index);
    }
  };

  return (
    <View className="flex w-full items-stretch justify-center gap-2">
      {Object.values(providers).map((provider) => (
        <SocialProvider
          key={provider}
          provider={provider}
          onClick={() => handleSignIn(provider)}
          actualProvider={actualProvider}
          isSubmitting={isSubmitting}
        />
      ))}
    </View>
  );
});

SocialProviders.displayName = "SocialProviders";
