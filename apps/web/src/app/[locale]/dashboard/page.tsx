import { getTranslation } from "@turbostarter/i18n/server";

import { AreaChart } from "~/components/dashboard/home/charts/area";
import { BarChart } from "~/components/dashboard/home/charts/bar";
import { LineChart } from "~/components/dashboard/home/charts/line";
import { PieChart } from "~/components/dashboard/home/charts/pie";
import { RadarChart } from "~/components/dashboard/home/charts/radar";
import { RadialChart } from "~/components/dashboard/home/charts/radial";
import { ShapeChart } from "~/components/dashboard/home/charts/shape";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "common:home",
  description: "marketing:dashboard.description",
});

export default async function AdminPage() {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            {t("dashboard.title")}
          </h1>
          <p className="text-pretty text-sm text-muted-foreground">
            {t("dashboard.description")}
          </p>
        </div>
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
