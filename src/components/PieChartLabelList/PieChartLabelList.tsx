"use client";

import { Pie, PieChart, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface PieChartLabelListProps {
  title?: string;
  description?: string;
  data?: {
    propertyType: string;
    customers: number;
    fill: string;
  }[];
  config?: ChartConfig;
}

export function PieChartLabelList({
  title = "Property Type Preferences",
  data = [
    {
      propertyType: "apartment",
      customers: 420,
      fill: "var(--color-blue-400)",
    },
    { propertyType: "house", customers: 380, fill: "var(--color-green-300)" },
    { propertyType: "villa", customers: 150, fill: "var(--color-purple-600)" },
    { propertyType: "condo", customers: 120, fill: "var(--color-orange-400)" },
    { propertyType: "cottage", customers: 80, fill: "var(--color-green-600)" },
  ],
  config = {
    customers: {
      label: "Customers",
    },
    apartment: {
      label: "Apartment",
      color: "var(--color-blue-500)",
    },
    house: {
      label: "House",
      color: "var(--color-green-500)",
    },
    villa: {
      label: "Villa",
      color: "var(--color-purple-500)",
    },
    condo: {
      label: "Condo",
      color: "var(--color-teal-500)",
    },
    cottage: {
      label: "Cottage",
      color: "var(--color-indigo-500)",
    },
  } satisfies ChartConfig,
}: PieChartLabelListProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={config} className="w-full h-[200px]">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="customers" hideLabel />}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: "20px" }}
            />
            <Pie
              data={data}
              dataKey="customers"
              nameKey="propertyType"
              cx="50%"
              cy="50%"
              outerRadius={70}
            >
              {data.map((entry, index) => (
                <Pie key={`cell-${index}`} fill={entry.fill} dataKey={""} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
