import { memo } from "react";
import { View } from "react-native";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

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
}: {
  provider: SOCIAL_PROVIDER;
  onClick: () => Promise<void>;
}) => {
  const Icon = ICONS[provider];

  return (
    <Button
      key={provider}
      variant="outline"
      size="lg"
      className="w-full flex-row justify-center gap-2.5"
      onPress={onClick}
    >
      <View className="h-6 w-6 dark:brightness-125">
        <Icon className="text-foreground" />
      </View>
      <Text>
        Sign in with <Text className="capitalize">{provider}</Text>
      </Text>
    </Button>
  );
};

export const SocialProviders = memo<SocialProvidersProps>(({ providers }) => {
  return (
    <View className="flex w-full flex-col items-stretch justify-center gap-2">
      {Object.values(providers).map((provider) => (
        <SocialProvider
          key={provider}
          provider={provider}
          onClick={() => {
            return Promise.resolve();
          }}
        />
      ))}
    </View>
  );
});

SocialProviders.displayName = "SocialProviders";
