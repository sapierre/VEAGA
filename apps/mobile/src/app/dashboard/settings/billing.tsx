import * as Linking from "expo-linking";
import { Pressable } from "react-native";
import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Text } from "@turbostarter/ui-mobile/text";

export default function Billing() {
  const { t } = useTranslation(["common", "marketing"]);

  return (
    <View className="flex flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-6 text-center">
        <Text className="font-sans-bold mt-4 text-4xl tracking-tight">
          {t("workInProgress.title")}
        </Text>
        <Text className="text-pretty text-center text-lg text-muted-foreground">
          {t("workInProgress.description", { feature: t("billing") })}
        </Text>
        <Pressable
          onPress={() =>
            Linking.openURL("https://github.com/orgs/turbostarter/projects/1")
          }
          className="mt-6"
        >
          <Text className="text-primary underline">{t("seeRoadmap")}</Text>
        </Pressable>
      </View>
    </View>
  );
}
