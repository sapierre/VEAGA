import { Alert } from "react-native";
import { View } from "react-native";

import { SocialProvider } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useAccounts } from "./hooks/use-accounts";

import type { SVGProps } from "react";

const ICONS: Record<SocialProvider, React.FC<SVGProps<SVGElement>>> = {
  [SocialProvider.GITHUB]: Icons.Github,
  [SocialProvider.GOOGLE]: Icons.Google,
};

export const Accounts = () => {
  const { t, i18n } = useTranslation(["auth", "common"]);
  const { accounts, socials, missing, isLoading, connect, disconnect } =
    useAccounts();

  const handleDisconnect = (provider: SocialProvider) => {
    Alert.alert(
      t("account.accounts.disconnect.cta", {
        provider: capitalize(provider),
      }),
      t("account.accounts.disconnect.disclaimer", {
        provider: capitalize(provider),
      }),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("continue"),
          onPress: () => disconnect.mutate(provider),
        },
      ],
    );
  };

  return (
    <View className="flex-1 gap-6 bg-background p-6">
      <Text className="text-muted-foreground">
        {t("account.accounts.description")}
      </Text>

      {isLoading ? (
        <View className="p-6">
          <Icons.Loader2 className="mx-auto size-6 animate-spin text-foreground" />
        </View>
      ) : (
        <>
          {socials.length > 0 && (
            <View className="overflow-hidden rounded-lg border border-border">
              {socials.map((social) => {
                const provider = social.providerId as SocialProvider;
                const Icon = ICONS[provider];

                return (
                  <View
                    key={social.accountId}
                    className="flex-row items-center border-b border-border p-4 last:border-b-0"
                  >
                    <Icon className="size-10 text-foreground" />
                    <View className="ml-3 flex-1">
                      <Text className="font-sans-medium capitalize">
                        {social.providerId}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        {t("account.accounts.connectedAt", {
                          date: social.updatedAt.toLocaleDateString(
                            i18n.language,
                          ),
                        })}
                      </Text>
                    </View>

                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={accounts.length === 1 || disconnect.isPending}
                      onPress={() => handleDisconnect(provider)}
                    >
                      {disconnect.isPending &&
                      disconnect.variables === provider ? (
                        <Icons.Loader2 className="size-5 animate-spin text-foreground" />
                      ) : (
                        <Icons.Trash className="text-foreground" size={20} />
                      )}
                    </Button>
                  </View>
                );
              })}
            </View>
          )}

          {missing.length > 0 && (
            <View className="gap-3 rounded-lg border border-dashed border-border px-5 py-4">
              <Text className="font-sans-medium">{t("addNew")}</Text>
              <View className="h-px bg-border" />
              <View className="flex-row flex-wrap gap-2">
                {missing.map((provider) => {
                  const Icon = ICONS[provider as SocialProvider];

                  return (
                    <Button
                      key={provider}
                      variant="outline"
                      disabled={connect.isPending}
                      onPress={() => connect.mutate(provider)}
                      className="native:px-4 native:h-[44px] flex-row items-center gap-2"
                    >
                      {connect.isPending && connect.variables === provider ? (
                        <Icons.Loader2 className="size-5 animate-spin" />
                      ) : (
                        <Icon className="size-7 text-foreground" />
                      )}
                      <Text className="capitalize">{provider}</Text>
                    </Button>
                  );
                })}
              </View>
            </View>
          )}
        </>
      )}

      <Text className="-mt-3 max-w-80 text-sm text-muted-foreground">
        {t("account.accounts.info")}
      </Text>
    </View>
  );
};
