import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { handle } from "@turbostarter/api/utils";
import { useTranslation } from "@turbostarter/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-mobile/avatar";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@turbostarter/ui-mobile/dropdown-menu";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { api } from "~/lib/api";
import { useSession } from "~/lib/auth";

interface BaseHeaderProps {
  readonly onBack?: () => void;
  readonly title?: string;
}

export const BaseHeader = ({ onBack, title }: BaseHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-background" style={{ paddingTop: insets.top + 12 }}>
      <View className="h-12 w-full flex-row items-center justify-center gap-3 pb-2">
        {onBack && (
          <Button
            size="icon"
            variant="outline"
            onPress={() => onBack()}
            className="absolute bottom-2 left-6"
          >
            <Icons.ChevronLeft
              width={20}
              height={20}
              className="text-muted-foreground"
            />
          </Button>
        )}

        {title && (
          <Text className="font-sans-medium mt-0.5 text-lg leading-none">
            {title}
          </Text>
        )}
      </View>
    </View>
  );
};

export const UserHeader = () => {
  const { t } = useTranslation("auth");
  const insets = useSafeAreaInsets();
  const { data } = useSession();

  const { data: customer } = useQuery({
    queryKey: ["customer", data?.user.id],
    queryFn: handle(api.billing.customer.$get),
    enabled: !!data?.user,
  });

  return (
    <View
      className="w-full flex-row items-center justify-between bg-background pb-2 pl-4 pr-6"
      style={{ paddingTop: insets.top + 4 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="native:px-2 native:h-14 flex-row items-center gap-3"
          >
            <Avatar alt={data?.user.name ?? ""}>
              <AvatarImage source={{ uri: data?.user.image ?? undefined }} />
              <AvatarFallback>
                <Icons.UserRound
                  width={20}
                  height={20}
                  className="text-muted-foreground"
                />
              </AvatarFallback>
            </Avatar>

            <View>
              <Text className="font-sans-medium native:leading-tight">
                {t("account.personal")}
              </Text>
              <Text className="native:text-sm native:leading-tight font-sans capitalize text-muted-foreground">
                {(customer?.plan ?? "free").toLowerCase()}
              </Text>
            </View>

            <Icons.ChevronsUpDown
              width={16}
              height={16}
              className="ml-4 text-muted-foreground"
            />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>

      <Button size="icon" variant="ghost">
        <Icons.Bell size={20} className="text-muted-foreground" />
      </Button>
    </View>
  );
};
