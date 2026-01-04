import { TabsContent } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const mockKeyFeatures = [
  {
    id: "1",
    title: "Premium Quality",
    detail: "Made with 310gsm cardstock",
    type: "QUALITY",
  },
  {
    id: "2",
    title: "Custom Design",
    detail: "Fully customizable artwork",
    type: "DESIGN",
  },
  {
    id: "3",
    title: "Durable Finish",
    detail: "UV-coated for longevity",
    type: "DURABILITY",
  },
  {
    id: "4",
    title: "Unique Packaging",
    detail: "Luxury box included",
    type: "UNIQUENESS",
  },
];

export function FeaturesTab() {
  return (
    <TabsContent value="features" className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Key Features Management</CardTitle>
              <CardDescription>
                Manage key features for your decks
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 size-4" />
                  Add Feature
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Key Feature</DialogTitle>
                  <DialogDescription>
                    Create a new key feature for decks
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="feature-title">Title</Label>
                    <Input id="feature-title" placeholder="Premium Quality" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature-detail">Detail</Label>
                    <Input
                      id="feature-detail"
                      placeholder="Made with 310gsm cardstock"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature-type">Type</Label>
                    <Select>
                      <SelectTrigger id="feature-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QUALITY">Quality</SelectItem>
                        <SelectItem value="DESIGN">Design</SelectItem>
                        <SelectItem value="USABILITY">Usability</SelectItem>
                        <SelectItem value="DURABILITY">Durability</SelectItem>
                        <SelectItem value="UNIQUENESS">Uniqueness</SelectItem>
                        <SelectItem value="PRODUCTION">Production</SelectItem>
                        <SelectItem value="PRICE">Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Feature</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockKeyFeatures.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className="font-medium">
                      {feature.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {feature.detail}
                    </TableCell>
                    <TableCell>
                      <Badge>{feature.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 size-4" />
                            Edit Feature
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Delete Feature
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
