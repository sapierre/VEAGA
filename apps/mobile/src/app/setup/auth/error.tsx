import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

const AuthError = () => {
  const { error } = useLocalSearchParams<{ error?: string }>();
  const { t } = useTranslation(["auth", "common"]);

  return (
    <View className="flex-1 flex-col items-center justify-center gap-4 bg-background px-8">
      <Icons.CircleX className="text-destructive" strokeWidth={1.2} size={80} />
      <Text className="text-center text-2xl font-semibold">
        {t("error.general")}
      </Text>

      {error && (
        <Text className="rounded-md bg-muted px-2 py-0.5 font-mono">
          {error}
        </Text>
      )}

      <Link
        href={pathsConfig.setup.auth.login}
        replace
        className="mt-3 text-muted-foreground underline"
      >
        {t("goToLogin")}
      </Link>
    </View>
  );
};

export default AuthError;
