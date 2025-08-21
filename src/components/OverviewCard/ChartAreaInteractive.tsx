/* eslint-disable react-refresh/only-export-components */
"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DataItem {
  [key: string]: string | number;
  month: string;
}

interface ChartAreaGradientProps {
  title?: string;
  description?: string;
  data?: DataItem[];
  config?: ChartConfig;
  showTrend?: boolean;
  comparing?: string;
  periodText?: string;
  height?: number;
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
}

export function ChartAreaGradient({
  title = "Area Chart - Gradient",
  data = defaultChartData,
  config = defaultChartConfig,
}: ChartAreaGradientProps) {
  const dataKeys = Object.keys(data[0]).filter((key) => key !== "month");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[200px]" config={config}>
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              {dataKeys.map((key) => (
                <linearGradient
                  key={key}
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            {dataKeys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export const defaultChartData = [
  { month: "January", desktop: 186, mobile: 140 },
  { month: "February", desktop: 205, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 125, mobile: 210 },
  { month: "August", desktop: 198, mobile: 110 },
  { month: "September", desktop: 245, mobile: 125 },
  { month: "October", desktop: 215, mobile: 180 },
  { month: "November", desktop: 140, mobile: 220 },
  { month: "December", desktop: 150, mobile: 150 },
];

const defaultChartConfig = {
  desktop: {
    label: "Desktop",
    color: "purple",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
