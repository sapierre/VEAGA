import { Link } from "expo-router";
import { View } from "react-native";

import { Trans, useTranslation } from "@turbostarter/i18n";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <View className="flex flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-6 text-center">
        <Text className="font-sans-bold mt-4 text-4xl">
          {t("error.notFound")}
        </Text>
        <Text className="text-pretty text-center text-lg">
          <Trans
            i18nKey="editToReload"
            ns="marketing"
            values={{ file: "src/app/+not-found.tsx" }}
            components={{
              code: <Text className="rounded-sm bg-muted px-1.5 font-mono" />,
            }}
          />
        </Text>
        <Link
          href={pathsConfig.index}
          replace
          className="mt-6 inline-block text-primary underline hover:no-underline"
        >
          {t("goBackHome")}
        </Link>
      </View>
    </View>
  );
}
