"use client";

import dayjs from "dayjs";
import { TrendingUp } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from "recharts";

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
  { month: dayjs().month(0).format("MMMM"), desktop: 186, mobile: 80 },
  { month: dayjs().month(1).format("MMMM"), desktop: 305, mobile: 200 },
  { month: dayjs().month(2).format("MMMM"), desktop: 237, mobile: 120 },
  { month: dayjs().month(3).format("MMMM"), desktop: 73, mobile: 190 },
  { month: dayjs().month(4).format("MMMM"), desktop: 209, mobile: 130 },
  { month: dayjs().month(5).format("MMMM"), desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "desktop",
    color: "hsl(var(--color-chart-1))",
  },
  mobile: {
    label: "mobile",
    color: "hsl(var(--color-chart-2))",
  },
} satisfies ChartConfig;

export function RadarChart() {
  const { t } = useTranslation(["common", "marketing"]);
  return (
    <Card>
      <CardHeader className="items-center space-y-0.5 pb-4">
        <CardTitle className="text-xl">{t("dashboard.chart.radar")}</CardTitle>
        <CardDescription>{t("dashboard.chart.period")}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsRadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="month"
              tick={({
                x,
                y,
                textAnchor,
                index,
                ...props
              }: {
                x: number;
                y: number;
                textAnchor: string;
                index: number;
                props: unknown;
              }) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const data = chartData[index]!;

                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan className="fill-muted-foreground">
                      {data.desktop}
                    </tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan className="fill-muted-foreground">
                      {data.mobile}
                    </tspan>
                    <tspan
                      x={x}
                      dy={"1rem"}
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.month}
                    </tspan>
                  </text>
                );
              }}
            />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill={chartConfig.desktop.color}
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill={chartConfig.mobile.color} />
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {t("dashboard.chart.trending")} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          {t("dashboard.chart.period")}
        </div>
      </CardFooter>
    </Card>
  );
}
