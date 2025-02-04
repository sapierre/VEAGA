import { Link } from "expo-router";
import { Trans } from "react-i18next";
import { View, ScrollView, Pressable } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { BuiltWith } from "@turbostarter/ui-mobile/built-with";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@turbostarter/ui-mobile/card";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

const LINKS = [
  {
    title: "feature.auth.title",
    description: "feature.auth.description",
    href: pathsConfig.tabs.auth.login,
  },
  {
    title: "feature.ai.title",
    description: "feature.ai.description",
    href: pathsConfig.tabs.ai,
  },
  {
    title: "feature.billing.title",
    description: "feature.billing.description",
    href: pathsConfig.tabs.billing,
  },
  {
    title: "feature.docs.title",
    description: "feature.docs.description",
    href: "https://turbostarter.dev/docs/mobile",
  },
] as const;

export default function App() {
  const { t } = useTranslation("marketing");
  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center bg-background p-6"
    >
      <Text className="w-full text-pretty rounded-md border border-input bg-muted/25 px-6 py-3 text-center">
        <Trans
          i18nKey="editToReload"
          ns="common"
          values={{ file: "app/index.tsx" }}
          components={{
            code: (
              <Text className="rounded-md bg-muted px-2 py-0.5 font-mono" />
            ),
          }}
        />
      </Text>

      <View className="animate-pulse py-20">
        <Icons.Logo className="text-primary" height={128} width={128} />
      </View>

      <View className="gap-3">
        {LINKS.map((link) => (
          <Link href={link.href} key={link.title} asChild>
            <Pressable>
              <Card>
                <CardHeader className="gap-1">
                  <View className="flex-row gap-1">
                    <CardTitle>{t(link.title)}</CardTitle>
                    <Icons.ArrowRight className="text-foreground" size={20} />
                  </View>
                  <CardDescription>{t(link.description)}</CardDescription>
                </CardHeader>
              </Card>
            </Pressable>
          </Link>
        ))}
      </View>

      <View className="py-10">
        <BuiltWith />
      </View>
    </ScrollView>
  );
}
