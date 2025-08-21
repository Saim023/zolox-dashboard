"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Visitor insights line chart";

const chartData = [
  { month: "Jan", loyal: 120, new: 80, unique: 200 },
  { month: "Feb", loyal: 230, new: 120, unique: 220 },
  { month: "Mar", loyal: 250, new: 250, unique: 240 },
  { month: "Apr", loyal: 200, new: 300, unique: 270 },
  { month: "May", loyal: 100, new: 220, unique: 270 },
  { month: "Jun", loyal: 200, new: 180, unique: 240 },
  { month: "Jul", loyal: 300, new: 200, unique: 260 },
  { month: "Aug", loyal: 350, new: 210, unique: 280 },
  { month: "Sep", loyal: 240, new: 270, unique: 300 },
  { month: "Oct", loyal: 290, new: 130, unique: 320 },
  { month: "Nov", loyal: 270, new: 140, unique: 340 },
  { month: "Dec", loyal: 300, new: 150, unique: 360 },
];

const chartConfig = {
  loyal: {
    label: "Loyal Customers",
    color: "var(--chart-1)",
  },
  new: {
    label: "New Customers",
    color: "var(--chart-2)",
  },
  unique: {
    label: "Unique Customers",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function VisitorInsightsChart() {
  return (
    <Card className="h-full flex flex-col p-3">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle>Visitor Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow h-[150px]">
        {" "}
        {/* Added pb-4 for bottom padding */}
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 8,
              top: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickCount={6}
              domain={[0, 400]}
              tick={{ fontSize: 12 }}
              ticks={[0, 100, 200, 300, 400]}
              width={40}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="loyal"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="new"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="unique"
              type="monotone"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
