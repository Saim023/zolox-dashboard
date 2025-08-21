"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users2, Building2 } from "lucide-react";
import { PieChart as PieChartIcon } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Progress data

const progressData = [
  { label: "Views", value: 100, main: "bg-blue-500", light: "bg-blue-100", labelColor: "text-blue-500" },
  { label: "Inquiries", value: 62, main: "bg-purple-500", light: "bg-purple-100", labelColor: "text-purple-500" },
  { label: "Bookings", value: 38, main: "bg-green-500", light: "bg-green-100", labelColor: "text-green-500" },
  { label: "Check-ins", value: 35, main: "bg-orange-500", light: "bg-orange-100", labelColor: "text-orange-500" },
];

// Pie chart colors
const COLORS = ["#2563eb", "#16a34a", "#d946ef", "#f59e0b", "#14b8a6", "#ef4444", "#8b5cf6", "#84cc16"];

export type RevenueData = {
  date: string;
  revenue: number;
  prevRevenue?: number;
  occ: number;
  prevOcc?: number;
  adr: number;
  prevAdr?: number;
};

export type CountryOccData = {
  country: string;
  occ: number;
};

export type SourceMixData = {
  name: string;
  value: number;
};

export type CountryAdrData = {
  country: string;
  adr: number;
};

// Composed Revenue Chart Function
function ComposedRevenueChart({ data, compare }: { data: RevenueData[]; compare?: boolean }) {
  console.log("Chart data:", data);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => new Date(value).toLocaleDateString()} />
        <YAxis yAxisId="left" tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} domain={[0, "dataMax + 50000"]} />
        <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `৳${v}`} domain={[0, "dataMax + 1000"]} />
        <Tooltip
          formatter={(v: unknown, name: string) => {
            if (name.includes("Revenue")) return `৳${(v as number).toLocaleString()}`;
            if (name.includes("ADR")) return `৳${v}`;
            return String(v);
          }}
          labelFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#2563eb" radius={[6, 6, 0, 0]} />
        {compare && (
          <Bar yAxisId="left" dataKey="prevRevenue" name="Prev Revenue" fill="#94a3b8" radius={[6, 6, 0, 0]} />
        )}
        <Line yAxisId="right" type="monotone" dataKey="adr" name="ADR" stroke="#16a34a" strokeWidth={2} dot={false} />
        {compare && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="prevAdr"
            name="Prev ADR"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 3"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// Format to tk
function formatBDT(value: number): string {
  return `৳${value.toLocaleString("en-BD")}`;
}

// ADR City
function aggregateAdrByCountry(data: CountryAdrData[]): CountryAdrData[] {
  const grouped: Record<string, { total: number; count: number }> = {};
  data.forEach((item) => {
    if (!grouped[item.country]) {
      grouped[item.country] = { total: 0, count: 0 };
    }
    grouped[item.country].total += item.adr;
    grouped[item.country].count += 1;
  });

  return Object.entries(grouped).map(([country, { total, count }]) => ({
    country,
    adr: total / count,
  }));
}

// Main
export default function DashboardTabs({
  byDate,
  countryOcc,
  sourceMix,
  data,
  compare = false,
}: {
  byDate: RevenueData[];
  countryOcc: CountryOccData[];
  sourceMix: SourceMixData[];
  data: CountryAdrData[];
  compare?: boolean;
}) {
  return (
    <div className="w-full mt-10">
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger
            value="revenue"
            className="data-[state=active]:text-blue-500 data-[state=active]:[&_svg]:text-blue-500 text-muted-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" /> Revenue
          </TabsTrigger>
          <TabsTrigger
            value="occupancy"
            className="data-[state=active]:text-blue-500 data-[state=active]:[&_svg]:text-blue-500 text-muted-foreground"
          >
            <Users2 className="h-4 w-4 mr-2 text-muted-foreground" /> Occupancy
          </TabsTrigger>
          <TabsTrigger
            value="sources"
            className="data-[state=active]:text-blue-500 data-[state=active]:[&_svg]:text-blue-500 text-muted-foreground"
          >
            <PieChartIcon className="h-4 w-4 mr-2 text-muted-foreground" /> Sources
          </TabsTrigger>
          <TabsTrigger
            value="countries"
            className="data-[state=active]:text-blue-500 data-[state=active]:[&_svg]:text-blue-500 text-muted-foreground"
          >
            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" /> Countries
          </TabsTrigger>
        </TabsList>

        {/* Revenue */}
        <TabsContent value="revenue" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Revenue & ADR over time</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedRevenueChart data={byDate} compare={compare} />
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Occupancy */}
        <TabsContent value="occupancy">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Occupancy trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={byDate} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v: number) => `${Math.round(v * 100)}%`} domain={[0, 1]} />
                    <Tooltip
                      formatter={(v: unknown, name: string) =>
                        name === "occ" ? `${Math.round((v as number) * 100)}%` : String(v)
                      }
                    />
                    <Line type="monotone" dataKey="occ" stroke="#16a34a" strokeWidth={2} dot={false} />
                    {compare && (
                      <Line
                        type="monotone"
                        dataKey="prevOcc"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="4 3"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Country-wise average occupancy</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={countryOcc} outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="country" />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 1]}
                      tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
                    />
                    <Radar name="Occ" dataKey="occ" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip formatter={(v: unknown) => `${Math.round((v as number) * 100)}%`} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sources */}
        <TabsContent value="sources">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by booking source</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceMix}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      cx="50%"
                      cy="50%"
                      paddingAngle={2}
                      labelLine={false}
                    >
                      {sourceMix.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: unknown) => formatBDT(value as number)}
                      contentStyle={{
                        background: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend
                      formatter={(value, _entry, index) => (
                        <span className="text-sm">
                          {value} ({formatBDT(sourceMix[index].value)})
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversion funnel</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px] flex flex-col">
                <div className="grid grid-cols-1 gap-4 w-full flex-1 py-4">
                  {progressData.map((step) => (
                    <div key={step.label} className="flex items-center gap-3">
                      <div className={`w-24 text-sm font-medium ${step.labelColor}`}>{step.label}</div>
                      <Progress value={step.value} indicatorColor={step.main} className={step.light} />
                      <div className="w-14 text-right text-sm font-medium">{step.value}</div>
                    </div>
                  ))}
                </div>

                {/* Legend*/}
                <div className="flex justify-center gap-6 pt-4">
                  {progressData.map((item) => (
                    <div key={item.label} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.main} mr-2`} />
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Country */}
        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle>ADR by Country</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aggregateAdrByCountry(data)}>
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="country" />
                  <YAxis tickFormatter={(v: number) => formatBDT(v)} />
                  <Tooltip formatter={(v: unknown) => formatBDT(v as number)} />
                  <Bar dataKey="adr" radius={[0, 0, 0, 0]}>
                    {aggregateAdrByCountry(data).map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
