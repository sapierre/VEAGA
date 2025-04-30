import { Link } from "expo-router";
import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Skeleton } from "@turbostarter/ui-mobile/skeleton";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { useSession } from "~/lib/auth";

import { AvatarSettings } from "./avatar/avatar-settings";

const AccountInfoSkeleton = () => {
  return (
    <View className="items-center">
      <Skeleton className="mb-4 size-28 rounded-full" />
      <Skeleton className="mb-3 h-5 w-40" />
      <Skeleton className="h-5 w-64" />
    </View>
  );
};

export const AccountInfo = () => {
  const { t } = useTranslation("auth");
  const { data, isPending } = useSession();

  const user = data?.user;

  if (isPending) {
    return <AccountInfoSkeleton />;
  }

  return (
    <View className="items-center">
      <AvatarSettings />
      {user ? (
        <Text className="text-xl font-semibold">{user.name}</Text>
      ) : (
        <Link href={pathsConfig.tabs.auth.login}>
          <Text className="text-xl font-semibold">{t("login.cta")}</Text>{" "}
          <Icons.ArrowRight size={16} className="text-foreground" />
        </Link>
      )}
      <Text className="text-center text-muted-foreground">
        {user ? user.email : t("notLoggedIn")}
      </Text>
    </View>
  );
};
