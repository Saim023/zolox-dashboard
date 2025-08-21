import type {
  CountryOccData,
  CountryAdrData,
  RevenueData,
  SourceMixData,
} from "@/components/DashboardTabs/DashboardTabs";

export const byDate: RevenueData[] = [
  { date: "2025-08-01", revenue: 120000, prevRevenue: 100000, occ: 0.72, prevOcc: 0.68, adr: 6200, prevAdr: 5800 },
  { date: "2025-08-02", revenue: 135000, prevRevenue: 110000, occ: 0.76, prevOcc: 0.7, adr: 6400, prevAdr: 5900 },
  { date: "2025-08-03", revenue: 142000, prevRevenue: 115000, occ: 0.8, prevOcc: 0.72, adr: 6600, prevAdr: 6000 },
  { date: "2025-08-04", revenue: 155000, prevRevenue: 120000, occ: 0.83, prevOcc: 0.74, adr: 6700, prevAdr: 6100 },
  { date: "2025-08-05", revenue: 148000, prevRevenue: 118000, occ: 0.79, prevOcc: 0.73, adr: 6500, prevAdr: 6050 },
  { date: "2025-08-06", revenue: 160000, prevRevenue: 125000, occ: 0.85, prevOcc: 0.75, adr: 6900, prevAdr: 6150 },
  { date: "2025-08-07", revenue: 172000, prevRevenue: 130000, occ: 0.88, prevOcc: 0.77, adr: 7100, prevAdr: 6200 },
];

export const countryOcc: CountryOccData[] = [
  { country: "USA", occ: 0.82 },
  { country: "Canada", occ: 0.76 },
  { country: "Australia", occ: 0.68 },
  { country: "Bangladesh", occ: 0.72 },
  { country: "New Zealand", occ: 0.7 },
  { country: "Maldives", occ: 5500 },
  { country: "Indonesia", occ: 4800 },
];

export const sourceMix: SourceMixData[] = [
  { name: "Direct", value: 480000 },
  { name: "OTA", value: 350000 },
  { name: "Corporate", value: 220000 },
  { name: "Travel Agent", value: 150000 },
];

export const data: CountryAdrData[] = [
  { country: "USA", adr: 6500 },
  { country: "Canada", adr: 5200 },
  { country: "Australia", adr: 4800 },
  { country: "Bangladesh", adr: 4500 },
  { country: "New Zealand", adr: 4300 },
  { country: "Maldives", adr: 5500 },
  { country: "Indonesia", adr: 4800 },
];
