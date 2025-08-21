/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import type { PaymentData } from "@/data/payments-data";

const pathSymbols = {
  revenue:
    "path://M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L3 13.5V15.5L9 14V16L3 17.5V19.5L9 18V22H15V18L21 19.5V17.5L15 16V14L21 15.5V13.5L15 12V10.5L21 9Z",
};

interface PictorialBarChartProps {
  data: PaymentData;
  className?: string;
}

const PictorialBarChart: React.FC<PictorialBarChartProps> = ({ data, className = "" }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const names = data.chartData.map((item) => item.name);
    const values = data.chartData.map((item) => item.value);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        formatter: function (params: any) {
          return params[0].name + ": " + params[0].value;
        },
      },
      grid: {
        top: 10,
        bottom: 30,
        left: 40,
        right: 10,
      },
      xAxis: {
        data: names,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          color: data.color,
          rotate: 30,
        },
      },
      yAxis: {
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          show: true,
          color: "#666",
          fontSize: 10,
        },
      },
      color: [data.color],
      series: [
        {
          name: "hill",
          type: "pictorialBar",
          barCategoryGap: "-130%",
          symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
          itemStyle: {
            opacity: 0.5,
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
            },
          },
          data: values,
          z: 10,
        },
        {
          name: "glyph",
          type: "pictorialBar",
          barGap: "-100%",
          symbolPosition: "end",
          symbolSize: 30,
          symbolOffset: [0, "-120%"],
          data: data.chartData.map((item) => ({
            value: item.value,
            symbol: pathSymbols.revenue,
            symbolSize: [30, 30],
          })),
        },
      ],
    };

    chart.setOption(option);

    // Handle responsiveness
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div ref={chartRef} className="w-full h-[300px]" />
    </div>
  );
};

export default PictorialBarChart;
