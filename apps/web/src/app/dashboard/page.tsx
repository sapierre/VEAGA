import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";

import { AreaChart } from "~/components/dashboard/charts/area";
import { BarChart } from "~/components/dashboard/charts/bar";
import { LineChart } from "~/components/dashboard/charts/line";
import { PieChart } from "~/components/dashboard/charts/pie";
import { RadarChart } from "~/components/dashboard/charts/radar";
import { RadialChart } from "~/components/dashboard/charts/radial";
import { ShapeChart } from "~/components/dashboard/charts/shape";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Home",
  description: "Your main app dashboard",
});

export default function AdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-pretty text-sm text-muted-foreground">
            An overview of your account's activity across all your projects.
          </p>
        </div>

        <Button className="gap-1.5">
          <Icons.Plus className="size-5" />
          Add chart
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BarChart />
        <PieChart />
        <ShapeChart />
      </div>
      <AreaChart />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RadialChart />
        <RadarChart />
      </div>
      <LineChart />
    </div>
  );
}
