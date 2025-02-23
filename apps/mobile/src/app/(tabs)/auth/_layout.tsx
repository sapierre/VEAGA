import { router, Stack } from "expo-router";

import { useTranslation } from "@turbostarter/i18n";

import { Header } from "~/components/common/layout/header";

export default function AuthLayout() {
  const { t } = useTranslation(["common", "auth"]);
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          header: () => <Header title={t("login.title")} />,
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          header: () => <Header title={t("register.title")} />,
        }}
      />

      <Stack.Screen
        name="error"
        options={{
          header: () => <Header title={t("error.title")} />,
        }}
      />

      <Stack.Screen
        name="password/forgot"
        options={{
          header: () => (
            <Header
              title={t("account.password.forgot.title")}
              onBack={router.back}
            />
          ),
        }}
      />

      <Stack.Screen
        name="password/update"
        options={{
          header: () => <Header title={t("account.password.update.title")} />,
        }}
      />
    </Stack>
  );
}
