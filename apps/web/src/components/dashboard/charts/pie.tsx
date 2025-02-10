"use client";

import dayjs from "dayjs";
import * as React from "react";
import { Label, Pie, PieChart as RechartsPieChart, Sector } from "recharts";

import { useTranslation } from "@turbostarter/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@turbostarter/ui-web/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@turbostarter/ui-web/select";

import type { ChartConfig } from "@turbostarter/ui-web/chart";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

const desktopData = [
  { month: "january", desktop: 186, fill: "hsl(var(--color-chart-1))" },
  { month: "february", desktop: 305, fill: "hsl(var(--color-chart-2))" },
  { month: "march", desktop: 237, fill: "hsl(var(--color-chart-3))" },
  { month: "april", desktop: 173, fill: "hsl(var(--color-chart-4))" },
  { month: "may", desktop: 209, fill: "hsl(var(--color-chart-5))" },
];

const chartConfig = {
  january: {
    label: dayjs().month(0).format("MMMM"),
    color: "hsl(var(--color-chart-1))",
  },
  february: {
    label: dayjs().month(1).format("MMMM"),
    color: "hsl(var(--color-chart-2))",
  },
  march: {
    label: dayjs().month(2).format("MMMM"),
    color: "hsl(var(--color-chart-3))",
  },
  april: {
    label: dayjs().month(3).format("MMMM"),
    color: "hsl(var(--color-chart-4))",
  },
  may: {
    label: dayjs().month(4).format("MMMM"),
    color: "hsl(var(--color-chart-5))",
  },
} satisfies ChartConfig;

export function PieChart() {
  const { t, i18n } = useTranslation(["common", "marketing"]);
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(
    desktopData[0]?.month ?? "january",
  );

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth],
  );
  const months = React.useMemo(() => desktopData.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-0.5">
          <CardTitle className="text-xl">{t("dashboard.chart.pie")}</CardTitle>
          <CardDescription>{t("dashboard.chart.period")}</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label={t("selectMonth")}
          >
            <SelectValue placeholder={t("selectMonth")} />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor:
                          "color" in config ? config.color : undefined,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <RechartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const data = desktopData[activeIndex];
                    if (!data) return null;

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.desktop.toLocaleString(i18n.language)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {t("visitors")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
