"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  DollarSign,
  Star,
  ImageIcon,
  Calendar,
  Edit,
} from "lucide-react";
import type { Deck, DeckPrice } from "@/types/api";

interface ViewDeckDialogProps {
  deck: Deck | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export function ViewDeckDialog({
  deck,
  open,
  onOpenChange,
  onEdit,
}: ViewDeckDialogProps) {
  if (!deck) return null;

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: DeckPrice) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
    }).format(price.amount);
  };

  const getFeatureTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      QUALITY: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      DESIGN:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      USABILITY:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      DURABILITY:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      UNIQUENESS:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      PRODUCTION:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      PRICE: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <div className="flex items-start justify-between gap-4 pr-5">
            <div className="space-y-1">
              <DialogTitle className="text-xl">{deck.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-sm">
                <Calendar className="size-3" />
                Created {formatDate(deck.createdAt)}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="shrink-0">
              ID: {deck.id.slice(0, 8)}...
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="py-4 space-y-6">
            {/* Description */}
            {deck.description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Package className="size-4" />
                  Description
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {deck.description}
                </p>
              </div>
            )}

            <Separator />

            {/* Pricing */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="size-4" />
                Pricing
              </div>
              {deck.prices.length > 0 ? (
                <div className="flex flex-wrap gap-2 pl-6">
                  {deck.prices.map((price) => (
                    <Badge
                      key={price.id}
                      variant="outline"
                      className="text-base font-semibold"
                    >
                      {formatPrice(price)}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground pl-6">
                  No pricing set
                </p>
              )}
            </div>

            <Separator />

            {/* Key Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Star className="size-4" />
                Key Features ({deck.keyFeatures.length})
              </div>
              {deck.keyFeatures.length > 0 ? (
                <div className="space-y-2 pl-6">
                  {deck.keyFeatures.map((df) => (
                    <div
                      key={df.id}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30"
                    >
                      <Badge
                        className={`shrink-0 ${getFeatureTypeBadgeColor(df.type)}`}
                      >
                        {df.type}
                      </Badge>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{df.title}</p>
                        {df.detail && (
                          <p className="text-xs text-muted-foreground">
                            {df.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground pl-6">
                  No features added
                </p>
              )}
            </div>

            <Separator />

            {/* Images */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImageIcon className="size-4" />
                Images ({deck.images.length})
              </div>
              {deck.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pl-6">
                  {deck.images.map((image) => (
                    <div
                      key={image.id}
                      className="aspect-square rounded-lg border overflow-hidden bg-muted"
                    >
                      <img
                        src={image.url}
                        alt={image.altText || deck.name}
                        className="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-lg ml-6">
                  <ImageIcon className="size-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No images uploaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="shrink-0" />

        <DialogFooter className="px-6 py-4 shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onEdit && (
            <Button onClick={onEdit}>
              <Edit className="mr-2 size-4" />
              Edit Deck
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
