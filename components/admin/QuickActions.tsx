import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, Download } from "lucide-react";
import { AddDeckDialog } from "./AddDeckDialog";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <AddDeckDialog
          trigger={
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 size-4" />
              Create New Deck
            </Button>
          }
        />

        <Button className="w-full justify-start" variant="outline">
          <Package className="mr-2 size-4" />
          View All Decks
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Download className="mr-2 size-4" />
          Export Data
        </Button>
      </CardContent>
    </Card>
  );
}
