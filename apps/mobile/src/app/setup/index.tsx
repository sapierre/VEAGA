/* eslint-disable @typescript-eslint/no-require-imports */
import { Image } from "expo-image";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Slider,
  SliderList,
  SliderPaginationDots,
  SliderPaginationDot,
  SliderListItem,
} from "@turbostarter/ui-mobile/slider";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { useTheme } from "~/lib/hooks/use-theme";
import { WIDTH } from "~/utils/device";

import type { ImageSource } from "expo-image";

const images = [
  {
    light: require("../../../public/images/setup/1/light.png") as ImageSource,
    dark: require("../../../public/images/setup/1/dark.png") as ImageSource,
  },
  {
    light: require("../../../public/images/setup/2/light.png") as ImageSource,
    dark: require("../../../public/images/setup/2/dark.png") as ImageSource,
  },
  {
    light: require("../../../public/images/setup/3/light.png") as ImageSource,
    dark: require("../../../public/images/setup/3/dark.png") as ImageSource,
  },
];

const ITEM_WIDTH = WIDTH - 48;

const WelcomePage = () => {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation(["common", "marketing", "auth"]);

  return (
    <SafeAreaView className="flex-1 gap-16 bg-background px-6 py-2">
      <View className="flex-1 gap-8 pt-2">
        <Slider threshold={ITEM_WIDTH}>
          <SliderList
            data={images}
            renderItem={({ item, index }) => (
              <SliderListItem
                className="flex-1 items-center justify-center"
                style={{ width: ITEM_WIDTH }}
                index={index}
              >
                <Image
                  source={item[resolvedTheme]}
                  contentFit="contain"
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                />
              </SliderListItem>
            )}
          />
          <SliderPaginationDots>
            {images.map((_, index) => (
              <SliderPaginationDot key={index} index={index} />
            ))}
          </SliderPaginationDots>
        </Slider>

        <View className="mt-auto gap-3">
          <Text className="font-sans-bold text-center text-4xl tracking-tighter">
            {t("product.title")}
          </Text>

          <Text className="px-6 text-center text-lg leading-snug text-muted-foreground">
            {t("product.description")}
          </Text>
        </View>
      </View>

      <View className="mt-auto gap-3">
        <Button
          size="lg"
          onPress={() => router.navigate(pathsConfig.setup.auth.register)}
        >
          <Text>{t("getStarted")}</Text>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={() => router.navigate(pathsConfig.setup.auth.login)}
        >
          <Text>
            {t("register.alreadyHaveAccount")} {t("login.cta")}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
