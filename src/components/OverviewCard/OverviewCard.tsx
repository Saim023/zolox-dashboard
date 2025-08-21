/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUp, type LucideIcon } from "lucide-react";

interface SalesCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon | any;
  color: "biscuit" | "yellow" | "green" | "purple";
}

const colorMap = {
  biscuit: "bg-[#FFE2E5]",
  yellow: "bg-[#FFF4DE]",
  green: "bg-[#DCFCE7]",
  purple: "bg-[#F3E8FF]",
};

const iconColorMap = {
  biscuit: "bg-[#FF6B83]",
  yellow: "bg-[#FFA43A]",
  green: "bg-[#3CD856]",
  purple: "bg-[#BF83FF]",
};

export function OverviewCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: SalesCardProps) {
  return (
    <div className={`rounded-xl p-5 shadow-sm ${colorMap[color]} `}>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-medium text-[#425166]">{title}</h1>
        <div className={`p-2 rounded-full ${iconColorMap[color]}`}>
          <Icon className="h-3 w-3 text-white" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
        <p className="mt-3 flex items-center text-xs text-[#425166]">
          <ArrowUp className="mr-1 h-3 w-3" />
          {change} from yesterday
        </p>
      </div>
    </div>
  );
}
