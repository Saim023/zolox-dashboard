import { ChartBarMultiple } from "@/components/ChartBarMultiple/ChartBarMultiple";
import { PieChartLabelList } from "@/components/PieChartLabelList/PieChartLabelList";
import { ChartAreaGradient, defaultChartData } from "@/components/OverviewCard/ChartAreaInteractive";
import { Overview } from "@/components/OverviewCard/Overview";
import { Button } from "@/components/ui/button";
import { VisitorInsightsChart } from "@/components/VisitorInsightsChart/VisitorInsightsChart";
import { CiExport } from "react-icons/ci";
import { RentalProgress } from "@/components/ProgressChart/RentalProgress";
import RentalWorldMap from "@/components/MapChart/RentalWorldMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChartDots } from "@/components/RadarChart/RadarChart";
import { radarData } from "@/components/RadarChart/RadarData";
import DashboardTabs from "@/components/DashboardTabs/DashboardTabs";
import { byDate, countryOcc, data, sourceMix } from "./dashboard-data";

export default function Dashboard() {
  return (
    <div className=" h-[calc(100vh-64px)] overflow-y-auto pb-14">
      <div className="mt-3 px-4 sm:px-5 lg:px-6 xl:px-7">
        {/* Top Row - Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Today's Booking Card*/}
          <div className="sm:col-span-2 h-full">
            <div className="h-full flex flex-col justify-between shadow-sm rounded-lg p-4 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
                <h1 className="text-base sm:text-lg font-semibold">Today's Booking</h1>
                <Button className="text-[#0F3659] w-full sm:w-auto cursor-pointer" variant="outline" size="sm">
                  <CiExport className="mr-2" />
                  Export
                </Button>
              </div>
              {/* Chart area */}
              <div className="flex-end">
                <Overview />
              </div>
            </div>
          </div>

          {/* Visitor Insights Card */}
          <div className="sm:col-span-1 h-full">
            <div className="h-full">
              <VisitorInsightsChart />
            </div>
          </div>
        </div>

        {/* Middle Charts */}
        <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Bar chart */}
          <div className="sm:col-span-2 flex flex-col">
            <div className="bg-white rounded-lg flex-1">
              <ChartBarMultiple
                title="Revenue of the previous year"
                description="Last 6 months performance"
                trendPercentage={7.5}
                footerText="Comparing desktop vs mobile visitors"
              />
            </div>
          </div>

          {/* Area chart */}
          <div className="sm:col-span-1 flex flex-col">
            <div className="bg-white rounded-lg flex-1">
              <ChartAreaGradient
                title="Mobile Traffic"
                description="Monthly mobile visitors"
                data={defaultChartData}
                comparing={"This month"}
                periodText="Jan 2023 - Jun 2024"
              />
            </div>
          </div>

          {/* Pie chart */}
          <div className="sm:col-span-1 flex flex-col">
            <div className="bg-white rounded-lg flex-1">
              <PieChartLabelList />
            </div>
          </div>
        </div>

        {/* Bottom charts */}
        <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Progress chart */}
          <div className="sm:col-span-2 flex flex-col">
            <div className="bg-white rounded-lg flex-1">
              <RentalProgress></RentalProgress>
            </div>
          </div>

          {/* Radar chart */}
          <div className="sm:col-span-1 flex flex-col">
            <div className="bg-white rounded-lg flex-1">
              <RadarChartDots
                title="Website Visitors"
                data={radarData}
                dataKey="visitors"
                color="var(--chart-2)"
                description={""}
              />
            </div>
          </div>

          {/* Map chart */}
          <div className="sm:col-span-1 flex flex-col">
            <Card className="flex">
              <CardHeader>
                <CardTitle>Service available in the world</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <RentalWorldMap />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="sm:col-span-1 flex flex-col">
          <DashboardTabs byDate={byDate} countryOcc={countryOcc} sourceMix={sourceMix} data={data} compare />
        </div>
      </div>
    </div>
  );
}
