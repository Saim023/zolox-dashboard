// StatCard.tsx
import { Card } from "../ui/card";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
import type { PaymentData } from "@/data/payments-data";
import type { ComponentType } from "react";

interface StatCardProps {
  data: PaymentData & {
    icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  };
}

export default function StatCard({ data }: StatCardProps) {
  const IconComponent = data.icon;

  const chartConfig = {
    mobile: {
      label: "Value",
      color: data.color,
    },
  };

  return (
    <Card className="pb-0">
      <div className="px-5 pt-5">
        <div className="flex justify-between items-start">
          <IconComponent className="text-6xl" style={{ color: data.color }} />
          <div className="text-right">
            <h1 className="text-4xl mb-2 font-semibold">{data.value}</h1>
            <div
              className="flex items-center gap-1.5 justify-end"
              style={{ color: data.change >= 0 ? data.increasedColor : "#ef4444" }}
            >
              <span>{data.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}</span>
              {Math.abs(data.change)}% {data.change >= 0 ? "increased" : "decreased"}
            </div>
          </div>
        </div>
      </div>
      <ChartContainer className="w-full h-[90px]" config={chartConfig}>
        <AreaChart data={data.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`fill-${data.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={data.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={data.color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" hide={true} />
          <YAxis hide={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="value" stroke={data.color} fill={`url(#fill-${data.id})`} strokeWidth={2} />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
