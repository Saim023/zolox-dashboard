import { Progress } from "../ui/progress";
import { rentalData } from "./RentalData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function RentalProgress() {
  const colorPairs = [
    { main: "bg-sky-600", light: "bg-sky-100" },
    { main: "bg-teal-600", light: "bg-teal-100" },
    { main: "bg-fuchsia-600", light: "bg-fuchsia-100" },
    { main: "bg-rose-300", light: "bg-rose-100" },
    // { main: "bg-cyan-600", light: "bg-cyan-100" },
    // { main: "bg-purple-600", light: "bg-purple-100" },
    // { main: "bg-violet-600", light: "bg-violet-100" },
  ];

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">
          Rental Availability by Country
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-4">
          {rentalData.map((country, index) => {
            const total = country.available + country.booked;
            const availablePercentage =
              total > 0 ? (country.available / total) * 100 : 0;
            const bookedPercentage =
              total > 0 ? (country.booked / total) * 100 : 0;
            const colors = colorPairs[index % colorPairs.length];

            return (
              <div key={country.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{country.name}</span>
                  <span className="text-muted-foreground">
                    {country.available} available / {country.booked} booked
                  </span>
                </div>
                <Progress
                  value={bookedPercentage}
                  secondaryValue={availablePercentage}
                  indicatorColor={colors.main}
                  secondaryIndicatorColor={colors.light}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
