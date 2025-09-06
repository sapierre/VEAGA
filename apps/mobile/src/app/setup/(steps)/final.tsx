import { router } from "expo-router";
import { ScrollView, View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import { Text } from "@turbostarter/ui-mobile/text";

import { useSetupSteps } from "~/app/setup/(steps)/_layout";
import { pathsConfig } from "~/config/paths";

export default function FinalStep() {
  const { t } = useTranslation(["common", "marketing"]);
  const { goNext } = useSetupSteps();

  return (
    <>
      <ScrollView
        className="pt-4"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-start gap-1">
          <Text className="font-sans-bold text-3xl">
            {t("setup.steps.step.final.title")}
          </Text>
          <Text className="text-lg leading-snug text-muted-foreground">
            {t("setup.steps.step.final.description")}
          </Text>
        </View>
      </ScrollView>

      <Button
        className="mt-auto"
        size="lg"
        onPress={() => {
          goNext();
          router.replace(pathsConfig.dashboard.index);
        }}
      >
        <Text>{t("finish")}</Text>
      </Button>
    </>
  );
}
