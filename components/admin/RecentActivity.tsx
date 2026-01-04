import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    action: "New user registered",
    user: "john@example.com",
    time: "2 minutes ago",
  },
  {
    action: "Deck created",
    user: "Premium Playing Cards",
    time: "1 hour ago",
  },
  {
    action: "Image uploaded",
    user: "deck-image-01.jpg",
    time: "3 hours ago",
  },
  {
    action: "Price updated",
    user: "Tarot Deck Deluxe",
    time: "5 hours ago",
  },
  {
    action: "User verified",
    user: "jane@example.com",
    time: "1 day ago",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest platform updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-3 border-b last:border-0"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <div className="size-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
