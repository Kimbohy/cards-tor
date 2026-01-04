import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Upload, Star, Download } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 size-4" />
              Create New Deck
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Deck</DialogTitle>
              <DialogDescription>
                Add a new deck to your collection
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deck-name">Deck Name</Label>
                <Input id="deck-name" placeholder="Enter deck name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deck-description">Description</Label>
                <Input id="deck-description" placeholder="Enter description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Deck</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button className="w-full justify-start" variant="outline">
          <Upload className="mr-2 size-4" />
          Upload Images
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Star className="mr-2 size-4" />
          Add Key Feature
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Download className="mr-2 size-4" />
          Export Data
        </Button>
      </CardContent>
    </Card>
  );
}
