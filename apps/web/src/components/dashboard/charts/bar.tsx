"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
} from "recharts";

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
  { browser: "chrome", visitors: 187, fill: "hsl(var(--color-chart-1))" },
  { browser: "safari", visitors: 200, fill: "hsl(var(--color-chart-2))" },
  { browser: "firefox", visitors: 275, fill: "hsl(var(--color-chart-3))" },
  { browser: "edge", visitors: 173, fill: "hsl(var(--color-chart-4))" },
  { browser: "other", visitors: 90, fill: "hsl(var(--color-chart-5))" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
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
  other: {
    label: "Other",
    color: "hsl(var(--color-chart-5))",
  },
} satisfies ChartConfig;

export function BarChart() {
  return (
    <Card>
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-xl">Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig].label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
