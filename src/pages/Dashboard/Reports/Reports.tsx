// Reports.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHome, FaUser, FaMoneyBillWave, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { revenueData } from "@/data/reports-data";
import CustomDonutChart from "@/components/CustomDonutChart/CustomDonutChart";
import EBarChart from "@/components/EBarChart/EBarChart";
import DashboardMetrics from "@/components/DashboardMetrics/DashboardMetrics";

export default function Reports() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto pb-10">
      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Summary Cards */}
        <Card className="col-span-1 bg-blue-100">
          <div className="flex items-center gap-4 p-4">
            <FaHome className="text-blue-500 text-4xl" />
            <div>
              <p className="text-2xl font-bold">50</p>
              <p className="text-sm text-muted-foreground mt-2">Total Units</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-1 bg-green-100">
          <div className="flex items-center gap-4 p-4">
            <FaUser className="text-green-500 text-4xl " />
            <div>
              <p className="text-3xl font-bold">42</p>
              <p className="text-sm text-muted-foreground mt-2">Active Tenants</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-1 bg-red-100">
          <div className="flex items-center gap-4 p-4">
            <FaMoneyBillWave className="text-red-500 text-4xl" />
            <div>
              <p className="text-3xl font-bold">$2,400</p>
              <p className="text-sm text-muted-foreground mt-2">Outstanding Rent</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-1 bg-teal-100">
          <div className="flex items-center gap-4 p-4">
            <FaChartLine className="text-teal-500 text-4xl" />
            <div>
              <p className="text-3xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground mt-2">Average Occupancy</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-1 bg-orange-100">
          <div className="flex items-center gap-4 p-4">
            <FaCalendarAlt className="text-orange-500 text-4xl" />
            <div>
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-muted-foreground mt-2">Upcoming Vacancies</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table and Pie */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-72 overflow-y-auto">
            <table className="w-full text-sm border border-gray-200 rounded-sm overflow-hidden">
              <thead className="bg-gray-100 text-left sticky top-0">
                <tr>
                  <th className="p-2 border-b">Month</th>
                  <th className="p-2 border-b">Rent Income</th>
                  <th className="p-2 border-b">Progress</th>
                  <th className="p-2 border-b">New Leases</th>
                  <th className="p-2 border-b">Expenses</th>
                  <th className="p-2 border-b">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                    <td className="p-2 border-b">{row.month}</td>
                    <td className="p-2 border-b">${row.rent.toLocaleString()}</td>
                    <td className="p-2 border-b">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              row.progress >= 80 ? "bg-green-500" : row.progress >= 40 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${row.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{row.progress}%</span>
                      </div>
                    </td>
                    <td className="p-2 border-b text-center">{row.newLeases}</td>
                    <td className="p-2 border-b">${row.expenses.toLocaleString()}</td>
                    <td className="p-2 border-b font-medium">${row.netProfit.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium mb-0">Revenue Breakdown</CardTitle>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-2">Last Month</span>
              <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="mt-0">
            <div className="h-[280px]">
              <CustomDonutChart dataType="revenue" centerText="Profit" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance & Lease */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <EBarChart />
        </Card>

        <Card className="py-6">
          <DashboardMetrics></DashboardMetrics>
        </Card>
      </div>
    </div>
  );
}
