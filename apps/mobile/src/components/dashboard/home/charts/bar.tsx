import { Geist_400Regular } from "@expo-google-fonts/geist";
import { useFont } from "@shopify/react-native-skia";
import { cssInterop } from "nativewind";
import { View } from "react-native";
import { Bar, CartesianChart } from "victory-native";

import { useTranslation } from "@turbostarter/i18n";
import { themes } from "@turbostarter/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@turbostarter/ui-mobile/card";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useTheme } from "~/lib/hooks/use-theme";
import { ThemeProvider, useThemeConfig } from "~/providers/theme";

const chartData = [
  {
    browser: "chrome",
    label: "Chrome",
    visitors: 187,
    className: "bg-chart-1",
  },
  {
    browser: "safari",
    label: "Safari",
    visitors: 200,
    className: "bg-chart-2",
  },
  {
    browser: "firefox",
    label: "Firefox",
    visitors: 275,
    className: "bg-chart-3",
  },
  { browser: "edge", label: "Edge", visitors: 173, className: "bg-chart-4" },
  { browser: "other", label: "Opera", visitors: 90, className: "bg-chart-5" },
];

const StyledBar = cssInterop(Bar, {
  className: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "color",
    },
  },
});

export function BarChart() {
  const font = useFont(Geist_400Regular, 12);
  const { t } = useTranslation(["common", "marketing"]);
  const { config } = useThemeConfig();
  const { resolvedTheme } = useTheme();

  const palette = themes[config.color][resolvedTheme];

  return (
    <Card className="w-full">
      <CardHeader className="gap-0.5">
        <CardTitle className="text-xl">{t("dashboard.chart.bar")}</CardTitle>
        <CardDescription>{t("dashboard.chart.period")}</CardDescription>
      </CardHeader>

      <CardContent className="h-[200px] px-5">
        <CartesianChart
          data={chartData}
          xKey="browser"
          yKeys={["visitors"]}
          domainPadding={{ left: 35, right: 35, bottom: 25 }}
          padding={{ bottom: 12 }}
          xAxis={{
            font,
            lineWidth: 0,
            formatXLabel: (value) =>
              chartData.find((data) => data.browser === value)?.label ?? value,
            labelOffset: 6,
            labelColor: (() => {
              const [h, s, l] = palette["muted-foreground"];
              return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
            })(),
          }}
        >
          {({ points, chartBounds }) => {
            return points.visitors.map((point) => {
              return (
                <ThemeProvider key={point.yValue}>
                  <StyledBar
                    barCount={points.visitors.length}
                    chartBounds={chartBounds}
                    points={[point]}
                    innerPadding={0.15}
                    roundedCorners={{
                      topLeft: 10,
                      topRight: 10,
                    }}
                    className={
                      chartData.find((data) => data.browser === point.xValue)
                        ?.className
                    }
                  />
                </ThemeProvider>
              );
            });
          }}
        </CartesianChart>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <View className="flex-row items-center gap-2">
          <Text className="font-sans-medium leading-none">
            {t("dashboard.chart.trending")}
          </Text>
          <Icons.TrendingUp size={16} />
        </View>
        <Text className="leading-none text-muted-foreground">
          {t("dashboard.chart.showing")}
        </Text>
      </CardFooter>
    </Card>
  );
}
