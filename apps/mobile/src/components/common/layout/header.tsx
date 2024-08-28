import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  readonly title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
      className="justify-center bg-primary px-8"
    >
      <Text className="pb-5 pt-1 text-2xl font-semibold text-primary-foreground">
        {title}
      </Text>
    </View>
  );
};
