import { vars } from "nativewind";
import { memo } from "react";
import { View } from "react-native";

import { cn, ThemeColor, ThemeMode } from "@turbostarter/ui";

import { Icons } from "../../lib/icons";

import { Button } from "./button";
import { Label } from "./label";
import { Text } from "./text";

import type { ThemeConfig } from "@turbostarter/ui";

interface ThemeCustomizerProps {
  readonly config: ThemeConfig;
  readonly defaultConfig?: ThemeConfig;
  readonly onChange: (config: ThemeConfig) => Promise<void>;
  readonly colors: Record<ThemeColor, string>;
}

const MODE_ICONS = {
  [ThemeMode.LIGHT]: Icons.Sun,
  [ThemeMode.DARK]: Icons.Moon,
  [ThemeMode.SYSTEM]: Icons.SunMoon,
} as const;

export const ThemeCustomizer = memo<ThemeCustomizerProps>(
  ({ config, defaultConfig, onChange, colors }) => {
    return (
      <>
        <View className="flex-row items-start">
          <View className="space-y-1 pr-2">
            <Text
              role="heading"
              aria-level={3}
              className="font-sans-medium text-2xl leading-none tracking-tight"
            >
              Customize
            </Text>
            <Text className="text-sm text-muted-foreground">
              Pick a style and color for your app.
            </Text>
          </View>
          {defaultConfig && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-[0.5rem]"
              onPress={() => onChange(defaultConfig)}
            >
              <Icons.Undo2 className="text-foreground" width={20} height={20} />
            </Button>
          )}
        </View>

        <View className="mt-2 flex flex-1 flex-col items-center gap-4">
          <View className="w-full gap-1.5">
            <Label nativeID="color" className="text-xs">
              Color
            </Label>
            <View className="flex-row flex-wrap gap-2">
              {Object.values(ThemeColor)
                .filter((color) => Object.values(ThemeColor).includes(color))
                .map((color) => {
                  const isActive = config.color === color;

                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      key={color}
                      onPress={() => onChange({ ...config, color })}
                      hitSlop={2}
                      className={cn(
                        "h-11 grow basis-[85px] flex-row justify-start gap-2 px-3",
                        isActive && "border-2 border-primary",
                      )}
                    >
                      <View
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border border-white bg-primary",
                        )}
                        {...(colors[color] && {
                          style: vars({
                            "--color-primary": colors[color],
                          }),
                        })}
                      ></View>
                      <Text className="text-xs capitalize">{color}</Text>
                    </Button>
                  );
                })}
            </View>
          </View>
          <View className="w-full gap-1.5">
            <Label nativeID="mode" className="text-xs">
              Mode
            </Label>
            <View className="flex-row flex-wrap gap-2">
              {Object.values(ThemeMode).map((mode) => {
                const isActive = config.mode === mode;
                const Icon = MODE_ICONS[mode];

                return (
                  <Button
                    variant="outline"
                    size="sm"
                    key={mode}
                    onPress={() => onChange({ ...config, mode })}
                    hitSlop={2}
                    className={cn(
                      "h-11 grow basis-[85px] flex-row justify-start gap-2 text-xs capitalize",
                      isActive && "border-2 border-primary",
                    )}
                  >
                    <Icon
                      className="shrink-0 text-foreground"
                      width={20}
                      height={20}
                    />
                    <Text className="capitalize">{mode}</Text>
                  </Button>
                );
              })}
            </View>
          </View>
        </View>
      </>
    );
  },
);

ThemeCustomizer.displayName = "ThemeCustomizer";
