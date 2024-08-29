import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  readonly title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + 5,
      }}
      className="flex-row items-center justify-start gap-3 bg-primary px-8 pb-5"
    >
      {/* {router.canGoBack() && (
        <Pressable onPress={() => router.back()}>
          <Icons.ArrowLeft className="text-primary-foreground" size={20} />
        </Pressable>
      )} */}
      <Text className="text-2xl font-semibold text-primary-foreground">
        {title}
      </Text>
    </View>
  );
};
