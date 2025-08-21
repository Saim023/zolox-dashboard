"use client";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GraphicComponent } from "echarts/components";
import type { PieSeriesOption, GraphicComponentOption } from "echarts";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { COLORS, occupancyData, revenueData } from "@/data/reports-data";

echarts.use([PieChart, TitleComponent, TooltipComponent, LegendComponent, GraphicComponent, CanvasRenderer]);

type ECOption = echarts.ComposeOption<PieSeriesOption | GraphicComponentOption>;

interface CustomDonutChartProps {
  dataType: "occupancy" | "revenue";
  title?: string;
  showLegend?: boolean;
  centerText?: string;
}

export default function CustomDonutChart({
  dataType,
  title = "",
  showLegend = true,
  centerText = "",
}: CustomDonutChartProps) {
  const svgIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIgMTIyIj48cGF0aCBkPSJNODQuNzQgMTIySDc5Ljg3TDg5LjQ1IDEwMC41OEg3Ni4zVjk2LjY2SDk0LjU4Vjk5Ljc0TDg0Ljc0IDEyMloiIGZpbGw9IiMwMDAiLz48L3N2Zz4=`;

  const getChartData = () => {
    if (dataType === "occupancy") {
      return occupancyData.map((item, index) => ({
        value: item.value,
        name: item.name,
        itemStyle: { color: COLORS[index % COLORS.length] },
      }));
    } else if (dataType === "revenue") {
      const latestMonth = revenueData[revenueData.length - 1];
      return [
        {
          value: latestMonth.rent,
          name: "Rent",
          itemStyle: { color: COLORS[0] },
        },
        {
          value: latestMonth.expenses,
          name: "Expenses",
          itemStyle: { color: COLORS[1] },
        },
        {
          value: latestMonth.netProfit,
          name: "Net Profit",
          itemStyle: { color: COLORS[2] },
        },
      ];
    }
    return [];
  };

  const chartData = getChartData();

  const option: ECOption = {
    title: title
      ? {
          text: title,
          left: "center",
          top: 10,
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        }
      : undefined,
    tooltip: {
      trigger: "item",
      formatter: "{b}: ${c} ({d}%)",
    },
    legend: showLegend
      ? {
          orient: "horizontal",
          bottom: 0,
          itemGap: 15,
          itemWidth: 15,
          itemHeight: 15,
          textStyle: {
            fontSize: 12,
            padding: [2, 0, 0, 5],
          },
          data: chartData.map((item) => item.name),
        }
      : undefined,
    grid: {
      top: title ? 40 : 20,
      bottom: showLegend ? 50 : 20,
      left: 20,
      right: 20,
      containLabel: true,
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "85%"],
        center: ["50%", showLegend ? "45%" : "50%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        data: chartData,
        label: { show: false },
        labelLine: { show: false },
      },
    ],
    graphic: centerText
      ? {
          type: "text",
          left: "center",
          top: showLegend ? "45%" : "50%",
          style: {
            text: centerText,
            fontSize: 18,
            fontWeight: "bold",
            fill: "#333",
          },
          z: 10,
        }
      : {
          type: "image",
          style: {
            image: svgIcon,
            width: 40,
            height: 40,
          },
          left: "center",
          top: showLegend ? "45%" : "50%",
          z: 10,
        },
  };

  return (
    <div className="relative w-full h-[280px]">
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
        theme="light"
      />
    </div>
  );
}
