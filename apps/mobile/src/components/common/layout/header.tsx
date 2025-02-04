import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  readonly title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-primary px-8" style={{ paddingTop: insets.top + 12 }}>
      <View className="h-12 flex-row items-center justify-center gap-3 pb-4">
        <Text className="text-2xl font-semibold leading-none text-primary-foreground">
          {title}
        </Text>
      </View>
    </View>
  );
};
