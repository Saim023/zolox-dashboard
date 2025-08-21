import type { OccupancyData, RevenueData } from "@/pages/Dashboard/Reports/report-types";

export const occupancyData: OccupancyData[] = [
  { name: "Occupied", value: 80 },
  { name: "Vacant", value: 20 },
];

export const revenueData: RevenueData[] = [
  { month: "Jan", rent: 12000, expenses: 4500, netProfit: 7500, occupancyRate: 85, newLeases: 3, progress: 85 },
  { month: "Feb", rent: 14000, expenses: 4800, netProfit: 9200, occupancyRate: 88, newLeases: 5, progress: 88 },
  { month: "Mar", rent: 10000, expenses: 5200, netProfit: 4800, occupancyRate: 82, newLeases: 2, progress: 25 },
  { month: "Apr", rent: 16000, expenses: 4900, netProfit: 11100, occupancyRate: 90, newLeases: 6, progress: 65 },
  { month: "May", rent: 18000, expenses: 5100, netProfit: 12900, occupancyRate: 92, newLeases: 4, progress: 50 },
  { month: "Jun", rent: 17000, expenses: 5300, netProfit: 11700, occupancyRate: 91, newLeases: 5, progress: 90 },
  { month: "Jul", rent: 19000, expenses: 5500, netProfit: 13500, occupancyRate: 93, newLeases: 7, progress: 82 },
  { month: "Aug", rent: 20000, expenses: 5700, netProfit: 14300, occupancyRate: 95, newLeases: 8, progress: 78 },
  { month: "Sep", rent: 18500, expenses: 5600, netProfit: 12900, occupancyRate: 92, newLeases: 6, progress: 88 },
  { month: "Oct", rent: 17500, expenses: 5400, netProfit: 12100, occupancyRate: 90, newLeases: 5, progress: 45 },
  { month: "Nov", rent: 16500, expenses: 5200, netProfit: 11300, occupancyRate: 89, newLeases: 4, progress: 60 },
  { month: "Dec", rent: 15000, expenses: 5000, netProfit: 10000, occupancyRate: 87, newLeases: 3, progress: 78 },
];

export const COLORS = [
  "#0284c7",
  "#0d9488",
  "#c026d3",
  "#fda4af",
  "#C5F527",
  "#27CFF5",
  "#7c3aed",
  "#10b981",
  "#6366f1",
  "#f59e0b",
  "#ec4899",
  "#84cc16",
];
