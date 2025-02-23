import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { DeleteAccount } from "~/components/settings/account/delete-account";
import { Logout } from "~/components/settings/account/logout";
import { SettingsTile } from "~/components/settings/layout/tile";
import { pathsConfig } from "~/config/paths";

const sections = [
  [
    () => {
      const { t } = useTranslation("common");

      return (
        <SettingsTile
          icon={Icons.IdCard}
          onPress={() =>
            router.navigate(pathsConfig.tabs.settings.account.name)
          }
        >
          <View className="mr-auto">
            <Text className="mr-auto">{t("name")}</Text>
          </View>
        </SettingsTile>
      );
    },
    () => {
      const { t } = useTranslation("common");
      return (
        <SettingsTile
          icon={Icons.AtSign}
          onPress={() =>
            router.navigate(pathsConfig.tabs.settings.account.email)
          }
        >
          <Text className="mr-auto">{t("email")}</Text>
        </SettingsTile>
      );
    },
    () => {
      const { t } = useTranslation(["common", "auth"]);
      return (
        <SettingsTile
          icon={Icons.Workflow}
          onPress={() =>
            router.navigate(pathsConfig.tabs.settings.account.accounts)
          }
        >
          <Text className="mr-auto">{t("account.accounts.title")}</Text>
        </SettingsTile>
      );
    },
    () => {
      const { t } = useTranslation(["common", "auth"]);
      return (
        <SettingsTile
          icon={Icons.Lock}
          onPress={() =>
            router.navigate(pathsConfig.tabs.settings.account.password)
          }
        >
          <Text className="mr-auto">{t("auth:password")}</Text>
        </SettingsTile>
      );
    },
  ],
  [Logout],
  [DeleteAccount],
];

export default function Account() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-8"
      bounces={false}
    >
      <View className="gap-6">
        {sections.map((section, index) => (
          <View key={index}>
            {section.map((item, index) => (
              <React.Fragment key={index}>{item()}</React.Fragment>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
