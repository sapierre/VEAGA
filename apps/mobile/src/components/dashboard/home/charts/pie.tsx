import { Path } from "@shopify/react-native-skia";
import dayjs from "dayjs";
import { cssInterop } from "nativewind";
import { useState } from "react";
import { View } from "react-native";
import { Pie, PolarChart, useSlicePath } from "victory-native";

import { useTranslation } from "@turbostarter/i18n";
import { cn, themes } from "@turbostarter/ui";
import {
  CardDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@turbostarter/ui-mobile/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@turbostarter/ui-mobile/select";
import { Text } from "@turbostarter/ui-mobile/text";

import { useTheme } from "~/lib/hooks/use-theme";
import { useThemeConfig } from "~/providers/theme";

import type { PieSliceData } from "victory-native";

const desktopData = [
  { month: "may", desktop: 209, className: "bg-chart-5" },
  { month: "april", desktop: 173, className: "bg-chart-4" },
  { month: "march", desktop: 237, className: "bg-chart-3" },
  { month: "february", desktop: 305, className: "bg-chart-2" },
  { month: "january", desktop: 186, className: "bg-chart-1" },
];

const chartConfig = {
  january: {
    label: dayjs().month(0).format("MMMM"),
    className: "bg-chart-1",
  },
  february: {
    label: dayjs().month(1).format("MMMM"),
    className: "bg-chart-2",
  },
  march: {
    label: dayjs().month(2).format("MMMM"),
    className: "bg-chart-3",
  },
  april: {
    label: dayjs().month(3).format("MMMM"),
    className: "bg-chart-4",
  },
  may: {
    label: dayjs().month(4).format("MMMM"),
    className: "bg-chart-5",
  },
};

const StyledPath = cssInterop(Path, {
  className: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "color",
      opacity: "opacity",
    },
  },
});

const Slice = ({ slice }: { slice: PieSliceData }) => {
  const path = useSlicePath({ slice: slice });

  return <StyledPath path={path} className={cn(slice.color.toString())} />;
};

export function PieChart() {
  const { t, i18n } = useTranslation(["common", "marketing"]);
  const { config } = useThemeConfig();
  const { resolvedTheme } = useTheme();
  const [activeMonth, setActiveMonth] = useState(
    desktopData.at(-1)?.month ?? "january",
  );

  const palette = themes[config.color][resolvedTheme];
  const months = desktopData.map((item) => item.month);

  return (
    <Card className="w-full pb-2">
      <CardHeader className="flex-row items-start justify-between gap-0.5">
        <View>
          <CardTitle className="text-xl">{t("dashboard.chart.pie")}</CardTitle>
          <CardDescription>{t("dashboard.chart.period")}</CardDescription>
        </View>

        <Select
          value={{
            value: activeMonth,
            label: chartConfig[activeMonth as keyof typeof chartConfig].label,
          }}
          onValueChange={(option) => setActiveMonth(option?.value ?? "january")}
        >
          <SelectTrigger
            className="ml-auto rounded-lg"
            aria-label={t("selectMonth")}
          >
            <View
              className={cn(
                "size-3 shrink-0 rounded-sm",
                chartConfig[activeMonth as keyof typeof chartConfig].className,
              )}
            />
            <SelectValue
              placeholder={t("selectMonth")}
              className="text-foreground"
            />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((month) => {
              const config = chartConfig[month as keyof typeof chartConfig];
              return (
                <SelectItem key={month} value={month} label={config.label}>
                  <View className="flex-row items-center gap-2 text-xs">
                    <View
                      className={cn(
                        "size-3 shrink-0 rounded-sm",
                        config.className,
                      )}
                    />
                    <Text>{config.label}</Text>
                  </View>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="relative h-[250px]">
        <PolarChart
          data={desktopData}
          labelKey="month"
          valueKey="desktop"
          colorKey="className"
        >
          <Pie.Chart innerRadius="50%">
            {({ slice }) => {
              const [h, s, l] = palette.background;
              return (
                <>
                  <Slice key={slice.value} slice={slice} />
                  {activeMonth === slice.label && (
                    <Pie.SliceAngularInset
                      angularInset={{
                        angularStrokeWidth: 8,
                        angularStrokeColor: `hsl(${h}, ${s * 100}%, ${l * 100}%)`,
                      }}
                    />
                  )}
                </>
              );
            }}
          </Pie.Chart>
        </PolarChart>

        <View className="absolute inset-0 items-center justify-center">
          <Text className="font-sans-bold -mt-3 text-4xl leading-none text-foreground">
            {desktopData
              .find((data) => data.month === activeMonth)
              ?.desktop.toLocaleString(i18n.language)}
          </Text>
          <Text className="text-sm leading-none text-muted-foreground">
            {t("visitors")}
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}
