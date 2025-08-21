"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RadarChartDotsProps {
  title: string;
  description: string;
  data: {
    [key: string]: string | number;
    month: string;
  }[];
  dataKey: string;
  color?: string;
  fillOpacity?: number;
  dotSize?: number;
  trend?: {
    value: string;
    icon?: React.ReactNode;
  };
  period?: string;
  className?: string;
}

export function RadarChartDots({
  title,
  description,
  data,
  dataKey,
  color = "var(--chart-1)",
  fillOpacity = 0.6,
  dotSize = 4,
  className,
}: RadarChartDotsProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <Card className={className}>
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey={dataKey}
              fill={color}
              fillOpacity={fillOpacity}
              dot={{
                r: dotSize,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
