import * as React from "react";
import { Pressable, View, Linking } from "react-native";

import { useTranslation } from "@turbostarter/i18n";

import { buttonVariants } from "./button";
import { Icons } from "./icons";
import { Text } from "./text";

export const BuiltWith = () => {
  const { t } = useTranslation("common");

  return (
    <Pressable
      onPress={() => Linking.openURL("https://www.turbostarter.dev")}
      className={buttonVariants({
        variant: "outline",
        className: "flex-row items-center justify-center gap-1",
      })}
    >
      <Text>{t("builtWith")}</Text>
      <View className="shrink-0 flex-row items-center gap-1.5">
        <Icons.Logo className="ml-1.5 text-primary" height={16} width={16} />
        <Icons.LogoText className="text-foreground" height={10} width={82} />
      </View>
    </Pressable>
  );
};
