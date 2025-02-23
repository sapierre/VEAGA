import * as Linking from "expo-linking";
import { Pressable } from "react-native";
import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Text } from "@turbostarter/ui-mobile/text";

export default function Notifications() {
  const { t } = useTranslation("common");

  return (
    <View className="flex flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-6 text-center">
        <Text className="font-sans-medium mt-4 text-4xl">
          {t("workInProgress.title")}
        </Text>
        <Text className="text-pretty text-center text-lg text-muted-foreground">
          {t("workInProgress.description", { feature: t("notifications") })}
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
