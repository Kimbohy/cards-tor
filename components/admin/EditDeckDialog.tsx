"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dropzone, type FileWithPreview } from "@/components/ui/dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, X, Save, Trash2, ImageIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Deck, DeckImage } from "@/types/api";
import { useEffect, useState } from "react";

// Types
const KEY_FEATURE_TYPES = [
  "QUALITY",
  "DESIGN",
  "USABILITY",
  "DURABILITY",
  "UNIQUENESS",
  "PRODUCTION",
  "PRICE",
] as const;

type KeyFeatureType = (typeof KEY_FEATURE_TYPES)[number];

interface EditableKeyFeature {
  id: string;
  title: string;
  detail: string;
  type: KeyFeatureType;
  isNew?: boolean;
}

interface EditablePrice {
  id: string;
  amount: string;
  currency: string;
  isNew?: boolean;
}

interface EditDeckFormData {
  name: string;
  description: string;
  prices: EditablePrice[];
  keyFeatures: EditableKeyFeature[];
  existingImages: DeckImage[];
  newImages: FileWithPreview[];
  imagesToDelete: string[];
}

interface EditDeckDialogProps {
  deck: Deck | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (deckId: string, data: EditDeckFormData) => void;
}

export function EditDeckDialog({
  deck,
  open,
  onOpenChange,
  onSave,
}: EditDeckDialogProps) {
  const [formData, setFormData] = useState<EditDeckFormData>({
    name: "",
    description: "",
    prices: [],
    keyFeatures: [],
    existingImages: [],
    newImages: [],
    imagesToDelete: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  // Initialize form data when deck changes
  useEffect(() => {
    if (deck && open) {
      setFormData({
        name: deck.name,
        description: deck.description || "",
        prices: deck.prices.map((p) => ({
          id: p.id,
          amount: p.amount.toString(),
          currency: p.currency,
        })),
        keyFeatures: deck.keyFeatures.map((kf) => ({
          id: kf.id,
          title: kf.title,
          detail: kf.detail || "",
          type: kf.type as KeyFeatureType,
        })),
        existingImages: deck.images,
        newImages: [],
        imagesToDelete: [],
      });
      setErrors({});
      setHasChanges(false);
    }
  }, [deck, open]);

  const updateFormData = <K extends keyof EditDeckFormData>(
    key: K,
    value: EditDeckFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Deck name is required";
    }

    formData.prices.forEach((price, index) => {
      if (!price.amount || parseFloat(price.amount) <= 0) {
        newErrors[`price-${index}`] = "Valid price is required";
      }
    });

    formData.keyFeatures.forEach((feature, index) => {
      if (!feature.title.trim()) {
        newErrors[`feature-${index}`] = "Feature title is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle close with unsaved changes check
  const handleClose = () => {
    if (hasChanges) {
      setShowUnsavedDialog(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleSave = () => {
    if (!validate() || !deck) return;

    console.log("Saving deck:", deck.id, formData);
    onSave?.(deck.id, formData);
    onOpenChange(false);
  };

  // Price management
  const addPrice = () => {
    updateFormData("prices", [
      ...formData.prices,
      { id: crypto.randomUUID(), amount: "", currency: "USD", isNew: true },
    ]);
  };

  const updatePrice = (
    index: number,
    field: keyof EditablePrice,
    value: string,
  ) => {
    const newPrices = [...formData.prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    updateFormData("prices", newPrices);
  };

  const removePrice = (index: number) => {
    if (formData.prices.length > 1) {
      updateFormData(
        "prices",
        formData.prices.filter((_, i) => i !== index),
      );
    }
  };

  // Key features management
  const addKeyFeature = () => {
    const newFeatureId = crypto.randomUUID();
    const newFeature: EditableKeyFeature = {
      id: newFeatureId,
      title: "",
      detail: "",
      type: "QUALITY",
      isNew: true,
    };
    updateFormData("keyFeatures", [...formData.keyFeatures, newFeature]);
    setExpandedFeature(newFeatureId); // Auto-expand the new feature
  };

  const updateKeyFeature = (
    index: number,
    field: keyof EditableKeyFeature,
    value: string,
  ) => {
    const newFeatures = [...formData.keyFeatures];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    updateFormData("keyFeatures", newFeatures);
  };

  const removeKeyFeature = (index: number) => {
    updateFormData(
      "keyFeatures",
      formData.keyFeatures.filter((_, i) => i !== index),
    );
  };

  // Image management
  const removeExistingImage = (imageId: string) => {
    updateFormData(
      "existingImages",
      formData.existingImages.filter((img) => img.id !== imageId),
    );
    updateFormData("imagesToDelete", [...formData.imagesToDelete, imageId]);
  };

  if (!deck) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle>Edit Deck</DialogTitle>
            <DialogDescription>
              Make changes to "{deck.name}". Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="py-4 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Basic Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">
                    Deck Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    placeholder="e.g., Bicycle 808 Rider Back"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className={cn(errors.name && "border-destructive")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Describe this deck..."
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Pricing</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPrice}
                  >
                    <Plus className="mr-1 size-3" />
                    Add Price
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.prices.map((price, index) => (
                    <div key={price.id} className="flex items-start gap-2">
                      <div className="flex-1 space-y-1">
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={price.amount}
                            onChange={(e) =>
                              updatePrice(index, "amount", e.target.value)
                            }
                            className={cn(
                              "flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                              errors[`price-${index}`] && "border-destructive",
                            )}
                          />
                          <Select
                            value={price.currency}
                            onValueChange={(value) =>
                              updatePrice(index, "currency", value)
                            }
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="MGA">MGA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors[`price-${index}`] && (
                          <p className="text-sm text-destructive">
                            {errors[`price-${index}`]}
                          </p>
                        )}
                      </div>
                      {formData.prices.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePrice(index)}
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {formData.prices.length === 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addPrice}
                    >
                      <Plus className="mr-1 size-4" />
                      Add your first price
                    </Button>
                  )}
                </div>
              </div>

              <Separator />

              {/* Key Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Key Features</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addKeyFeature}
                    disabled={formData.keyFeatures.length >= 10}
                  >
                    <Plus className="mr-1 size-3" />
                    Add Feature
                  </Button>
                </div>

                {formData.keyFeatures.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      No features added
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addKeyFeature}
                      className="mt-2"
                    >
                      <Plus className="mr-1 size-3" />
                      Add feature
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {formData.keyFeatures.map((feature, index) => {
                      const isExpanded = expandedFeature === feature.id;
                      const hasError = errors[`feature-${index}`];
                      const displayTitle =
                        feature.title || `Feature ${index + 1}`;
                      const typeLabel =
                        feature.type.charAt(0) +
                        feature.type.slice(1).toLowerCase();

                      return (
                        <Collapsible
                          key={feature.id}
                          open={isExpanded}
                          onOpenChange={(open) =>
                            setExpandedFeature(open ? feature.id : null)
                          }
                        >
                          <div
                            className={cn(
                              "border rounded-lg transition-colors",
                              isExpanded && "border-primary/50 bg-muted/30",
                              hasError && "border-destructive/50",
                            )}
                          >
                            {/* Collapsed Header */}
                            <div className="flex items-center gap-2 p-3">
                              <CollapsibleTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="size-7 p-0 shrink-0"
                                >
                                  <ChevronDown
                                    className={cn(
                                      "size-4 transition-transform duration-200",
                                      isExpanded && "rotate-180",
                                    )}
                                  />
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleTrigger asChild>
                                <button
                                  type="button"
                                  className="flex-1 flex items-center gap-2 text-left min-w-0"
                                >
                                  <span className="font-medium truncate">
                                    {displayTitle}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="shrink-0 text-xs"
                                  >
                                    {typeLabel}
                                  </Badge>
                                  {feature.isNew && (
                                    <Badge
                                      variant="secondary"
                                      className="shrink-0 text-xs text-primary"
                                    >
                                      New
                                    </Badge>
                                  )}
                                  {hasError && (
                                    <Badge
                                      variant="destructive"
                                      className="shrink-0 text-xs"
                                    >
                                      Error
                                    </Badge>
                                  )}
                                </button>
                              </CollapsibleTrigger>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="size-7 p-0 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => removeKeyFeature(index)}
                              >
                                <X className="size-4" />
                              </Button>
                            </div>

                            {/* Expanded Content */}
                            <CollapsibleContent>
                              <div className="px-3 pb-3 pt-1 space-y-3 border-t">
                                <div className="grid gap-3 sm:grid-cols-2 pt-3">
                                  <div className="space-y-1.5">
                                    <Label
                                      htmlFor={`edit-feature-title-${index}`}
                                    >
                                      Title{" "}
                                      <span className="text-destructive">
                                        *
                                      </span>
                                    </Label>
                                    <Input
                                      id={`edit-feature-title-${index}`}
                                      placeholder="e.g., Premium Card Stock"
                                      value={feature.title}
                                      onChange={(e) =>
                                        updateKeyFeature(
                                          index,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                      className={cn(
                                        hasError && "border-destructive",
                                      )}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label
                                      htmlFor={`edit-feature-type-${index}`}
                                    >
                                      Type
                                    </Label>
                                    <Select
                                      value={feature.type}
                                      onValueChange={(value) =>
                                        updateKeyFeature(index, "type", value)
                                      }
                                    >
                                      <SelectTrigger
                                        id={`edit-feature-type-${index}`}
                                      >
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {KEY_FEATURE_TYPES.map((type) => (
                                          <SelectItem key={type} value={type}>
                                            {type.charAt(0) +
                                              type.slice(1).toLowerCase()}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <Label
                                    htmlFor={`edit-feature-detail-${index}`}
                                  >
                                    Detail (Optional)
                                  </Label>
                                  <Textarea
                                    id={`edit-feature-detail-${index}`}
                                    placeholder="Additional details..."
                                    value={feature.detail}
                                    onChange={(e) =>
                                      updateKeyFeature(
                                        index,
                                        "detail",
                                        e.target.value,
                                      )
                                    }
                                    rows={2}
                                  />
                                </div>
                                {hasError && (
                                  <p className="text-sm text-destructive">
                                    {errors[`feature-${index}`]}
                                  </p>
                                )}
                              </div>
                            </CollapsibleContent>
                          </div>
                        </Collapsible>
                      );
                    })}
                  </div>
                )}
              </div>

              <Separator />

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Images</h3>

                {/* Existing Images */}
                {formData.existingImages.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Current Images
                    </Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {formData.existingImages.map((image) => (
                        <div
                          key={image.id}
                          className="relative group aspect-square rounded-lg border overflow-hidden bg-muted"
                        >
                          <img
                            src={image.url}
                            alt={image.altText || "Deck image"}
                            className="size-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeExistingImage(image.id)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Upload */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Add New Images
                  </Label>
                  <Dropzone
                    value={formData.newImages}
                    onChange={(files) => updateFormData("newImages", files)}
                    accept="image/*"
                    maxFiles={10 - formData.existingImages.length}
                    maxSize={5 * 1024 * 1024}
                    placeholder="Drop images here or click to browse"
                  />
                </div>

                {formData.existingImages.length === 0 &&
                  formData.newImages.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-lg">
                      <ImageIcon className="size-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No images yet
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <Separator className="shrink-0" />

          <DialogFooter className="px-6 py-4 shrink-0">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              <Save className="mr-2 size-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close without
              saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowUnsavedDialog(false);
                onOpenChange(false);
              }}
            >
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
