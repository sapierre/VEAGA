import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useSetupSteps } from "~/app/setup/(steps)/_layout";
import { Spinner } from "~/components/common/spinner";
import { SettingsTile } from "~/components/dashboard/settings/layout/tile";
import { pathsConfig } from "~/config/paths";
import { signOut } from "~/lib/auth";

export const Logout = () => {
  const { t } = useTranslation(["common", "auth"]);
  const { reset } = useSetupSteps();
  const { mutate, isPending: isSigningOut } = useMutation({
    mutationFn: () =>
      signOut({
        fetchOptions: {
          onSuccess: () => {
            reset();
            router.replace(pathsConfig.index);
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
