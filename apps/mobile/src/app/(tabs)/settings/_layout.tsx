import { router, Stack } from "expo-router";

import { isKey, useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";

import { Header } from "~/components/common/layout/header";

export default function SettingsLayout() {
  const { t, i18n } = useTranslation("common");

  return (
    <Stack
      initialRouteName="index"
      screenOptions={({ route }) => ({
        header: () => (
          <Header
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
      })}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="general" />
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
