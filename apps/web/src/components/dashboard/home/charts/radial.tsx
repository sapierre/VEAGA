"use client";

import { TrendingUp } from "lucide-react";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

import { useTranslation } from "@turbostarter/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@turbostarter/ui-web/chart";

import type { ChartConfig } from "@turbostarter/ui-web/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "hsl(var(--color-chart-1))" },
  { browser: "safari", visitors: 200, fill: "hsl(var(--color-chart-2))" },
  { browser: "firefox", visitors: 187, fill: "hsl(var(--color-chart-3))" },
  { browser: "edge", visitors: 173, fill: "hsl(var(--color-chart-4))" },
  { browser: "opera", visitors: 90, fill: "hsl(var(--color-chart-5))" },
];

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--color-chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--color-chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--color-chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--color-chart-4))",
  },
  opera: {
    label: "Opera",
    color: "hsl(var(--color-chart-5))",
  },
} satisfies ChartConfig;

export function RadialChart() {
  const { t } = useTranslation(["common", "marketing"]);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center space-y-0.5 pb-0">
        <CardTitle className="text-xl">{t("dashboard.chart.radial")}</CardTitle>
        <CardDescription>{t("dashboard.chart.period")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="visitors" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {t("dashboard.chart.trending")} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {t("dashboard.chart.showing")}
        </div>
      </CardFooter>
    </Card>
  );
}
