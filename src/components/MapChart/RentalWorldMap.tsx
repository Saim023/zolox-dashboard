/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import {
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import worldMap from "../../assets/world.json";

// Register ECharts modules
echarts.use([
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
  MapChart,
  CanvasRenderer,
]);

// Register the map
echarts.registerMap("world", worldMap as any);

export default function RentalWorldMap() {
  const availableCountries = [
    { name: "Bangladesh", value: 1 },
    { name: "United States", value: 1 },
    { name: "Germany", value: 1 },
    { name: "Australia", value: 1 },
    { name: "Japan", value: 1 },
  ];

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        params.value
          ? `${params.name}: Available`
          : `${params.name}: Not Available`,
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ["#e5e7eb", "#34d399"],
      },
    },
    series: [
      {
        name: "Rental Availability",
        type: "map",
        map: "world",
        roam: true,
        emphasis: {
          label: { show: true },
        },
        data: availableCountries,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: "200px" }} />
  );
}
