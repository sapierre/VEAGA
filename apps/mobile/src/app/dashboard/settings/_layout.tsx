import { router, Stack } from "expo-router";

import { isKey, useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";

import { BaseHeader } from "~/components/common/layout/header";

export default function SettingsLayout() {
  const { t, i18n } = useTranslation("common");

  return (
    <Stack
      initialRouteName="index"
      screenOptions={({ route }) => ({
        header: () => (
          <BaseHeader
            title={
              route.name === "index"
                ? t("settings")
                : isKey(route.name, i18n, "common")
                  ? t(route.name)
                  : capitalize(route.name)
            }
            {...(router.canGoBack() &&
              route.name !== "index" && {
                onBack: () => router.back(),
              })}
          />
        ),
        animation: "fade",
        animationDuration: 200,
      })}
    >
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
