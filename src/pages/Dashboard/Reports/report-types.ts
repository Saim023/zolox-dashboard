export interface OccupancyData {
  name: string;
  value: number;
}

export interface RevenueData {
  month: string;
  rent: number;
  expenses: number;
  netProfit: number;
  occupancyRate: number;
  newLeases: number;
  progress: number;
}
