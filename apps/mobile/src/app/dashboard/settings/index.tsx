import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as StoreReview from "expo-store-review";
import { ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { AccountInfo } from "~/components/dashboard/settings/account/account-info";
import { SettingsTile } from "~/components/dashboard/settings/layout/tile";
import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";
import { useSession } from "~/lib/auth";

import type { Session } from "@turbostarter/auth";

const getSections = (session?: Session) =>
  [
    [
      {
        title: "general",
        icon: Icons.Settings,
        onPress: () =>
          router.navigate(pathsConfig.dashboard.settings.general.index),
        visible: true,
      },
      {
        title: "account",
        icon: Icons.UserRound,
        onPress: () =>
          router.navigate(pathsConfig.dashboard.settings.account.index),
        visible: !!session,
      },
      {
        title: "billing",
        icon: Icons.Wallet,
        onPress: () => router.navigate(pathsConfig.dashboard.settings.billing),
        visible: !!session,
      },
    ],
    [
      {
        title: "rate",
        icon: Icons.ThumbsUp,
        onPress: async () => {
          const available = await StoreReview.hasAction();

          if (available) {
            return await StoreReview.requestReview();
          }

          return Share.share({
            title: Constants.expoConfig?.name,
            message: appConfig.url,
          });
        },
        visible: true,
      },
      {
        title: "share",
        icon: Icons.Share2,
        onPress: () =>
          Share.share({
            title: Constants.expoConfig?.name,
            message: appConfig.url,
          }),
        visible: true,
      },
      {
        title: "privacy",
        icon: Icons.Lock,
        onPress: () => Linking.openURL(`${appConfig.url}/legal/privacy-policy`),
        visible: true,
      },
    ],
  ] as const;

export default function Settings() {
  const { data } = useSession();
  const { t } = useTranslation("common");

  const sections = getSections(data?.session);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="gap-8 py-10"
        bounces={false}
      >
        <AccountInfo />

        <View className="gap-6">
          {sections.map((section, index) => (
            <View key={index}>
              {section
                .filter((item) => item.visible)
                .map((item) => (
                  <SettingsTile {...item} key={item.title}>
                    <Text className="mr-auto">{t(item.title)}</Text>
                  </SettingsTile>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
