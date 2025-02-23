import { Pressable } from "react-native";

import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-mobile/icons";

interface SettingsTileProps {
  readonly icon: React.ElementType;
  readonly children: React.ReactNode;
  readonly onPress?: () => void;
  readonly destructive?: boolean;
}

export const SettingsTile = ({
  icon: Icon,
  onPress,
  children,
  destructive,
}: SettingsTileProps) => {
  return (
    <Pressable
      hitSlop={4}
      className={cn(
        "flex-row items-center justify-between gap-5 bg-card px-7 py-4 transition-colors active:bg-muted",
      )}
      onPress={onPress}
    >
      <Icon
        width={22}
        height={22}
        className={cn("text-muted-foreground", {
          "text-destructive": destructive,
        })}
      />
      {children}
      <Icons.ChevronRight className="text-muted-foreground" />
    </Pressable>
  );
};
