import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { OverviewCard } from "./OverviewCard";

export function Overview() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        title="Total Amount"
        value="$30K"
        change="8%"
        icon={DollarSign}
        color="biscuit"
      />
      <OverviewCard
        title="Total Booked"
        value="300"
        change="5%"
        icon={ShoppingCart}
        color="yellow"
      />
      <OverviewCard
        title="Booked Today"
        value="5"
        change="2%"
        icon={Package}
        color="green"
      />
      <OverviewCard
        title="Customers"
        value="8"
        change="7%"
        icon={Users}
        color="purple"
      />
    </div>
  );
}
