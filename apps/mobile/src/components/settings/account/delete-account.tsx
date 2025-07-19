import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { Spinner } from "~/components/common/spinner";
import { SettingsTile } from "~/components/settings/layout/tile";
import { pathsConfig } from "~/config/paths";
import { deleteUser } from "~/lib/auth";

export const DeleteAccount = () => {
  const { t } = useTranslation(["common", "auth"]);
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      deleteUser(
        {
          callbackURL: pathsConfig.index,
        },
        {
          onSuccess: () => {
            Alert.alert(t("account.delete.confirmation.success"), undefined, [
              {
                onPress: () => {
                  router.back();
                },
              },
            ]);
          },
        },
      ),
  });

  return (
    <>
      <SettingsTile
        destructive
        icon={Icons.Trash2}
        onPress={() => {
          Alert.alert(
            t("account.delete.title"),
            t("account.delete.disclaimer"),
            [
              {
                text: t("cancel"),
                style: "cancel",
              },
              {
                text: t("account.delete.confirmation.cta"),
                style: "destructive",
                onPress: () => mutate(),
              },
            ],
          );
        }}
      >
        <Text className="mr-auto text-destructive">
          {t("account.delete.title")}
        </Text>
      </SettingsTile>
      {isPending && <Spinner />}
    </>
  );
};
