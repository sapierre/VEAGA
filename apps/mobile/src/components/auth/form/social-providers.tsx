import { router } from "expo-router";
import { memo } from "react";
import { Alert, View } from "react-native";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
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
        <Icons.Loader2 className="animate-spin" />
      ) : (
        <>
          <View className="h-6 w-6 dark:brightness-125">
            <Icon className="text-foreground" />
          </View>
          <Text>
            Sign in with <Text className="capitalize">{provider}</Text>
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

  const handleSignIn = async (provider: SOCIAL_PROVIDER) => {
    await signIn.social(
      {
        provider,
        callbackURL: pathsConfig.tabs.settings,
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
          Alert.alert("Something went wrong!", error.message);
        },
      },
    );

    const session = await getSession();

    if (session.data) {
      router.navigate(pathsConfig.tabs.settings);
    }
  };

  return (
    <View className="flex w-full flex-col items-stretch justify-center gap-2">
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
