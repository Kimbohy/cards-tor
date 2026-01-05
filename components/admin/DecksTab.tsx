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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Image as ImageIcon,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonGroup } from "../ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { MultipleInput } from "../ui/MultipleInput";
import AddDeckDialog from "./AddDeckDialog";

const mockDecks = [
  {
    id: "1",
    name: "Premium Playing Cards",
    description: "Luxury poker cards with gold foil",
    images: 5,
    price: 25,
    keyFeatures: 3,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Tarot Deck Deluxe",
    description: "Hand-illustrated tarot cards",
    images: 3,
    price: 15,
    keyFeatures: 4,
    createdAt: "2024-02-15",
  },
  {
    id: "3",
    name: "Custom Game Cards",
    description: "Design your own game",
    images: 8,
    price: 37,
    keyFeatures: 5,
    createdAt: "2024-03-20",
  },
];

const keyFeaturesTypes = [
  "QUALITY",
  "DESIGN",
  "USABILITY",
  "DURABILITY",
  "UNIQUENESS",
  "PRODUCTION",
  "PRICE",
];

export function DecksTab() {
  return (
    <TabsContent value="decks" className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Decks Management</CardTitle>
              <CardDescription>Manage your card deck products</CardDescription>
            </div>
            {/* add deck button */}
            <AddDeckDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search decks..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="size-4" />
              </Button>
            </div>

            {/* Decks Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Images</TableHead>
                    <TableHead className="text-center">price</TableHead>
                    <TableHead className="text-center">Features</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDecks.map((deck) => (
                    <TableRow key={deck.id}>
                      <TableCell className="font-medium">{deck.name}</TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {deck.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{deck.images}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{deck.price}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{deck.keyFeatures}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {deck.createdAt}
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
                              <Eye className="mr-2 size-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 size-4" />
                              Edit Deck
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ImageIcon className="mr-2 size-4" />
                              Manage Images
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DollarSign className="mr-2 size-4" />
                              Manage Pricing
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 size-4" />
                              Delete Deck
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
