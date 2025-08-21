/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { COLORS, revenueData } from "@/data/reports-data";

const EBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize the chart
    const myChart = echarts.init(chartRef.current);

    // Prepare data from revenueData
    const months = revenueData.map((item) => item.month);
    const rentData = revenueData.map((item) => item.rent);
    const expensesData = revenueData.map((item) => item.expenses);
    const netProfitData = revenueData.map((item) => item.netProfit);
    const occupancyRates = revenueData.map((item) => item.occupancyRate);
    const newLeasesData = revenueData.map((item) => item.newLeases);

    // Chart options
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params: any) {
          const dataIndex = params[0].dataIndex;
          const revenue = revenueData[dataIndex];
          let result = `<div style="font-weight:bold;margin-bottom:5px;">${revenue.month}</div>`;

          params.forEach((param: any) => {
            if (param.seriesName === "Occupancy Rate") {
              result += `${param.marker} ${param.seriesName}: <b>${param.value}%</b><br/>`;
            } else if (param.seriesName === "New Leases") {
              result += `${param.marker} ${param.seriesName}: <b>${param.value}</b><br/>`;
            } else {
              result += `${param.marker} ${param.seriesName}: <b>$${param.value.toLocaleString()}</b><br/>`;
            }
          });

          return result;
        },
      },
      legend: {
        data: ["Rent", "Expenses", "Net Profit", "Occupancy Rate", "New Leases"],
        textStyle: {
          color: "#ccc",
        },
        top: 10,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: months,
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
      },
      yAxis: [
        {
          type: "value",
          name: "Amount ($)",
          nameTextStyle: {
            color: "#ccc",
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        {
          type: "value",
          name: "Rate (%) / Count",
          nameTextStyle: {
            color: "#ccc",
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "Rent",
          type: "bar",
          barWidth: 15,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: COLORS[0] },
              { offset: 1, color: COLORS[1] },
            ]),
          },
          data: rentData,
        },
        {
          name: "Expenses",
          type: "bar",
          barWidth: 15,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: COLORS[6] },
              { offset: 1, color: COLORS[7] },
            ]),
          },
          data: expensesData,
        },
        {
          name: "Net Profit",
          type: "bar",
          barWidth: 15,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: COLORS[2] },
              { offset: 1, color: COLORS[3] },
            ]),
          },
          data: netProfitData,
        },
        {
          name: "Occupancy Rate",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            width: 3,
            color: COLORS[4],
          },
          itemStyle: {
            color: COLORS[4],
          },
          data: occupancyRates,
        },
        {
          name: "New Leases",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          symbol: "diamond",
          symbolSize: 10,
          lineStyle: {
            width: 2,
            type: "dashed",
            color: COLORS[5],
          },
          itemStyle: {
            color: COLORS[5],
          },
          data: newLeasesData,
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto pl-4 rounded-lg">
      <h1 className="text-lg font-semibold mb-2">Property Performance</h1>
      <div ref={chartRef} className="w-full h-96" id="main" />
    </div>
  );
};

export default EBarChart;
