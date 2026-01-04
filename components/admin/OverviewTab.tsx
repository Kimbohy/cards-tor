import { TabsContent } from "@/components/ui/tabs";
import { StatsCard } from "./StatsCard";
import { QuickActions } from "./QuickActions";
import { RecentActivity } from "./RecentActivity";
import { Users, Package, DollarSign, ShoppingCart } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Total Decks",
    value: "456",
    change: "+8%",
    icon: Package,
    color: "text-green-600",
  },
  {
    title: "Total Revenue",
    value: "$12,345",
    change: "+23%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Active Orders",
    value: "89",
    change: "+5%",
    icon: ShoppingCart,
    color: "text-orange-600",
  },
];

export function OverviewTab() {
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </TabsContent>
  );
}
