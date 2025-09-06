import { View, ScrollView } from "react-native";

import { BuiltWith } from "@turbostarter/ui-mobile/built-with";

import { AreaChart } from "~/components/dashboard/home/charts/area";
import { BarChart } from "~/components/dashboard/home/charts/bar";
import { PieChart } from "~/components/dashboard/home/charts/pie";

export default function Home() {
  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center bg-background gap-6 px-6 py-2"
      showsVerticalScrollIndicator={false}
    >
      <BarChart />
      <PieChart />
      <AreaChart />

      <View className="pb-10 pt-4">
        <BuiltWith />
      </View>
    </ScrollView>
  );
}
