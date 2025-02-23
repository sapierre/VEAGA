import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icons } from "@turbostarter/ui-mobile/icons";

interface HeaderProps {
  readonly title: string;
  readonly onBack?: () => void;
}

export const Header = ({ title, onBack }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-primary px-6" style={{ paddingTop: insets.top + 8 }}>
      <View className="h-12 flex-row items-center justify-center gap-3 pb-4">
        {onBack && (
          <TouchableOpacity
            className="absolute bottom-4 left-0"
            onPress={onBack}
          >
            <Icons.ChevronLeft size={30} className="text-primary-foreground" />
          </TouchableOpacity>
        )}
        <Text className="text-2xl font-semibold leading-none text-primary-foreground">
          {title}
        </Text>
      </View>
    </View>
  );
};
