import { memo } from "react";
import { View } from "react-native";

import { Text } from "@turbostarter/ui-mobile/text";

interface AuthHeaderProps {
  readonly title: string;
  readonly description: string;
}

export const AuthHeader = memo<AuthHeaderProps>(({ title, description }) => {
  return (
    <View>
      <Text className="font-sans-medium text-3xl tracking-tight">{title}</Text>
      <Text className="mt-2 text-muted-foreground">{description}</Text>
    </View>
  );
});

AuthHeader.displayName = "AuthHeader";
