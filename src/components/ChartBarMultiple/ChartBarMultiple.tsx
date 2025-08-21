"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ChartBarMultipleProps {
  title?: string;
  description?: string;
  data?: {
    month: string;
    desktop: number;
    mobile: number;
  }[];
  showTrend?: boolean;
  trendPercentage?: number;
  footerText?: string;
}

export function ChartBarMultiple({
  title = "Bar Chart - Multiple",
  data = [
    { month: "January", desktop: 286, mobile: 180 },
    { month: "February", desktop: 250, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 273, mobile: 190 },
    { month: "May", desktop: 309, mobile: 230 },
    { month: "June", desktop: 314, mobile: 240 },
  ],
}: ChartBarMultipleProps) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: " #95BEB0",
    },
    mobile: {
      label: "Mobile",
      color: "pink",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[200px]" config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
