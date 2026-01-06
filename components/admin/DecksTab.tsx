"use client";

import * as React from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
} from "lucide-react";
import { AddDeckDialog } from "./AddDeckDialog";
import { ViewDeckDialog, type DeckData } from "./ViewDeckDialog";
import { EditDeckDialog } from "./EditDeckDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

// Mock data with full structure matching Prisma schema
const mockDecks: DeckData[] = [
  {
    id: "clx1234567890",
    name: "Premium Playing Cards",
    description:
      "Luxury poker cards with gold foil accents. Perfect for collectors and professional card players. Made with premium 310gsm cardstock.",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    images: [
      { id: "img1", url: "/images/deck1-front.jpg", altText: "Front view" },
      { id: "img2", url: "/images/deck1-back.jpg", altText: "Back view" },
      { id: "img3", url: "/images/deck1-box.jpg", altText: "Box design" },
    ],
    prices: [
      { id: "price1", amount: 25.99, currency: "USD" },
      { id: "price2", amount: 23.5, currency: "EUR" },
    ],
    keyFeatures: [
      {
        id: "kf1",
        keyFeature: {
          id: "f1",
          title: "Premium Card Stock",
          detail: "Made with 310gsm cardstock for superior handling",
          type: "QUALITY",
        },
      },
      {
        id: "kf2",
        keyFeature: {
          id: "f2",
          title: "Gold Foil Accents",
          detail: "Elegant gold foil on tuck box and card backs",
          type: "DESIGN",
        },
      },
      {
        id: "kf3",
        keyFeature: {
          id: "f3",
          title: "Air-Cushion Finish",
          detail: "Smooth handling for cardistry and magic",
          type: "USABILITY",
        },
      },
    ],
  },
  {
    id: "clx9876543210",
    name: "Tarot Deck Deluxe",
    description:
      "Hand-illustrated tarot cards with intricate designs. Each card tells a story.",
    createdAt: "2024-02-15T14:30:00Z",
    updatedAt: "2024-02-20T09:15:00Z",
    images: [
      { id: "img4", url: "/images/deck2-spread.jpg", altText: "Card spread" },
    ],
    prices: [{ id: "price3", amount: 45.0, currency: "USD" }],
    keyFeatures: [
      {
        id: "kf4",
        keyFeature: {
          id: "f4",
          title: "Hand-Illustrated",
          detail: "Each card uniquely illustrated by artist",
          type: "UNIQUENESS",
        },
      },
      {
        id: "kf5",
        keyFeature: {
          id: "f5",
          title: "Premium Linen Finish",
          detail: "Durable linen finish for years of use",
          type: "DURABILITY",
        },
      },
    ],
  },
  {
    id: "clx1122334455",
    name: "Custom Game Cards",
    description: "Design your own game with these customizable cards.",
    createdAt: "2024-03-20T08:45:00Z",
    updatedAt: "2024-03-20T08:45:00Z",
    images: [],
    prices: [{ id: "price4", amount: 37.5, currency: "USD" }],
    keyFeatures: [],
  },
];

export function DecksTab() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterBy, setFilterBy] = React.useState("all");

  // Dialog states
  const [viewDeck, setViewDeck] = React.useState<DeckData | null>(null);
  const [editDeck, setEditDeck] = React.useState<DeckData | null>(null);
  const [deleteDeck, setDeleteDeck] = React.useState<DeckData | null>(null);

  // Filter decks based on search and filter
  const filteredDecks = React.useMemo(() => {
    return mockDecks.filter((deck) => {
      const matchesSearch =
        deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deck.description?.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterBy === "all") return matchesSearch;
      if (filterBy === "with-images")
        return matchesSearch && deck.images.length > 0;
      if (filterBy === "no-images")
        return matchesSearch && deck.images.length === 0;
      if (filterBy === "with-features")
        return matchesSearch && deck.keyFeatures.length > 0;

      return matchesSearch;
    });
  }, [searchTerm, filterBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (deck: DeckData) => {
    if (deck.prices.length === 0) return "—";
    const mainPrice = deck.prices[0];
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: mainPrice.currency,
    }).format(mainPrice.amount);
  };

  const handleDelete = () => {
    if (deleteDeck) {
      console.log("Deleting deck:", deleteDeck.id);
      // In real app, call API here
      setDeleteDeck(null);
    }
  };

  const handleViewToEdit = () => {
    if (viewDeck) {
      setEditDeck(viewDeck);
      setViewDeck(null);
    }
  };

  return (
    <TabsContent value="decks" className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Decks Management</CardTitle>
              <CardDescription>Manage your card deck products</CardDescription>
            </div>
            <AddDeckDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search decks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-45">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decks</SelectItem>
                  <SelectItem value="with-images">With Images</SelectItem>
                  <SelectItem value="no-images">No Images</SelectItem>
                  <SelectItem value="with-features">With Features</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Decks Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="text-center">Images</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center hidden sm:table-cell">
                      Features
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Created
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDecks.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        <Package className="size-8 mx-auto mb-2 opacity-50" />
                        <p>No decks found</p>
                        {searchTerm && (
                          <p className="text-sm">
                            Try adjusting your search or filter
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDecks.map((deck) => (
                      <TableRow key={deck.id}>
                        <TableCell className="font-medium">
                          <button
                            className="hover:underline text-left"
                            onClick={() => setViewDeck(deck)}
                          >
                            {deck.name}
                          </button>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate text-muted-foreground">
                          {deck.description || "—"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">
                            {deck.images.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{formatPrice(deck)}</Badge>
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <Badge variant="secondary">
                            {deck.keyFeatures.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden lg:table-cell">
                          {formatDate(deck.createdAt)}
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
                              <DropdownMenuItem
                                onClick={() => setViewDeck(deck)}
                              >
                                <Eye className="mr-2 size-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setEditDeck(deck)}
                              >
                                <Edit className="mr-2 size-4" />
                                Edit Deck
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteDeck(deck)}
                              >
                                <Trash2 className="mr-2 size-4" />
                                Delete Deck
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Results count */}
            {filteredDecks.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Showing {filteredDecks.length} of {mockDecks.length} decks
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ViewDeckDialog
        deck={viewDeck}
        open={!!viewDeck}
        onOpenChange={(open) => !open && setViewDeck(null)}
        onEdit={handleViewToEdit}
      />

      <EditDeckDialog
        deck={editDeck}
        open={!!editDeck}
        onOpenChange={(open) => !open && setEditDeck(null)}
        onSave={(deckId, data) => {
          console.log("Saving deck:", deckId, data);
          setEditDeck(null);
        }}
      />

      <DeleteConfirmDialog
        open={!!deleteDeck}
        onOpenChange={(open) => !open && setDeleteDeck(null)}
        onConfirm={handleDelete}
        title="Delete Deck"
        itemName={deleteDeck?.name}
      />
    </TabsContent>
  );
}
