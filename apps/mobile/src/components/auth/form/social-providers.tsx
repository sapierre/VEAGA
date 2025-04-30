import { router } from "expo-router";
import { memo } from "react";
import { Alert, View } from "react-native";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
import { Trans, useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useAuthFormStore } from "~/components/auth/form/store";
import { pathsConfig } from "~/config/paths";
import { getSession, signIn } from "~/lib/auth";

import type { AUTH_PROVIDER } from "@turbostarter/auth";
import type { SVGProps } from "react";

interface SocialProvidersProps {
  readonly providers: SOCIAL_PROVIDER[];
}

const ICONS: Record<SOCIAL_PROVIDER, React.FC<SVGProps<SVGElement>>> = {
  [SOCIAL_PROVIDER.GITHUB]: Icons.Github,
  [SOCIAL_PROVIDER.GOOGLE]: Icons.Google,
};

const SocialProvider = ({
  provider,
  onClick,
  actualProvider,
  isSubmitting,
}: {
  provider: SOCIAL_PROVIDER;
  isSubmitting: boolean;
  onClick: () => void;
  actualProvider: AUTH_PROVIDER;
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
  const { t } = useTranslation("common");
  const {
    provider: actualProvider,
    setProvider,
    isSubmitting,
    setIsSubmitting,
  } = useAuthFormStore();

  const handleSignIn = async (provider: SOCIAL_PROVIDER) => {
    await signIn.social(
      {
        provider,
        callbackURL: pathsConfig.tabs.settings.index,
        errorCallbackURL: pathsConfig.tabs.auth.error,
      },
      {
        onRequest: () => {
          setProvider(provider);
          setIsSubmitting(true);
        },
        onResponse: () => {
          setIsSubmitting(false);
        },
        onError: ({ error }) => {
          Alert.alert(t("error.title"), error.message);
        },
      },
    );

    const session = await getSession();

    if (session.data) {
      router.navigate(pathsConfig.tabs.settings.index);
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
