import React from "react";
import { Building, Home, DollarSign, TrendingUp, Users, Key, Calendar, PieChart } from "lucide-react";

// Define types for our data
interface MetricCardData {
  id: number;
  name: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}

// Sample data for our metrics cards
const metricData: MetricCardData[] = [
  { id: 1, name: "Total Properties", value: 24, icon: Building, color: "#0d9488" },
  { id: 2, name: "Occupied Units", value: 18, icon: Home, color: "#0284c7" },
  { id: 3, name: "Vacant Units", value: 6, icon: Key, color: "#0d9488" },
  { id: 4, name: "Monthly Revenue", value: "$18,500", icon: DollarSign, color: "#0284c7" },
  { id: 5, name: "Occupancy Rate", value: "85%", icon: PieChart, color: "#0d9488" },
  { id: 6, name: "New Leases", value: 5, icon: TrendingUp, color: "#0284c7" },
  { id: 7, name: "Maintenance Requests", value: 3, icon: Calendar, color: "#0d9488" },
  { id: 8, name: "Tenants", value: 42, icon: Users, color: "#0284c7" },
];

const DashboardMetrics = () => {
  return (
    <div className="px-5">
      <p className="text-lg font-semibold mb-2">Overview</p>

      <div className="flex flex-col gap-4">
        {metricData.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </div>
  );
};

// MetricCard component
const MetricCard = ({ metric }: { metric: MetricCardData }) => {
  const Icon = metric.icon;

  return (
    <div className="px-3 py-1 rounded-sm" style={{ backgroundColor: `${metric.color}60` }}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2.5">
          <Icon size={14} style={{ color: metric.color }} />
          <h3 className="">{metric.name}</h3>
        </div>
        <p className="">{metric.value}</p>
      </div>
    </div>
  );
};

export default DashboardMetrics;
