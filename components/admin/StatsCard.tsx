import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`size-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <TrendingUp className="size-3 text-accent" />
          <span className="text-accent">{change}</span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
