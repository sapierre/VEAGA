import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { Spinner } from "~/components/common/spinner";
import { SettingsTile } from "~/components/settings/layout/tile";
import { pathsConfig } from "~/config/paths";
import { signOut } from "~/lib/auth";

export const Logout = () => {
  const { t } = useTranslation(["common", "auth"]);
  const { mutate, isPending: isSigningOut } = useMutation({
    mutationFn: () =>
      signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace(pathsConfig.index);
          },
          onError: ({ error }) => {
            Alert.alert(t("error.title"), error.message);
          },
        },
      }),
  });

  return (
    <>
      <SettingsTile
        icon={Icons.LogOut}
        onPress={() => {
          Alert.alert(t("logout.cta"), t("logout.confirm"), [
            {
              text: t("cancel"),
              style: "cancel",
            },
            {
              text: t("logout.cta"),
              style: "destructive",
              onPress: () => mutate(),
            },
          ]);
        }}
      >
        <Text className="mr-auto">{t("logout.cta")}</Text>
      </SettingsTile>
      {isSigningOut && <Spinner />}
    </>
  );
};
