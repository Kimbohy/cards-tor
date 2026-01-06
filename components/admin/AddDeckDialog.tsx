"use client";

import * as React from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Package,
  DollarSign,
  Star,
  ImageIcon,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

interface KeyFeature {
  id: string;
  title: string;
  detail: string;
  type: KeyFeatureType;
}

interface Price {
  amount: string;
  currency: string;
}

export interface DeckFormData {
  name: string;
  description: string;
  prices: Price[];
  keyFeatures: KeyFeature[];
  images: FileWithPreview[];
}

const STEPS = [
  { id: "info", label: "Basic Info", icon: Package },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "features", label: "Features", icon: Star },
  { id: "images", label: "Images", icon: ImageIcon },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const initialFormData: DeckFormData = {
  name: "",
  description: "",
  prices: [{ amount: "", currency: "USD" }],
  keyFeatures: [],
  images: [],
};

interface AddDeckDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: (data: DeckFormData) => void;
}

export function AddDeckDialog({ trigger, onSuccess }: AddDeckDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState<StepId>("info");
  const [formData, setFormData] = React.useState<DeckFormData>(initialFormData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [expandedFeature, setExpandedFeature] = React.useState<string | null>(
    null
  );

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setCurrentStep("info");
      setErrors({});
      setExpandedFeature(null);
    }
  }, [open]);

  const validateStep = (step: StepId): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case "info":
        if (!formData.name.trim()) {
          newErrors.name = "Deck name is required";
        }
        break;
      case "pricing":
        formData.prices.forEach((price, index) => {
          if (!price.amount || parseFloat(price.amount) <= 0) {
            newErrors[`price-${index}`] = "Valid price is required";
          }
        });
        break;
      case "features":
        // Features are optional, but if added, they need a title
        formData.keyFeatures.forEach((feature, index) => {
          if (!feature.title.trim()) {
            newErrors[`feature-${index}`] = "Feature title is required";
          }
        });
        break;
      case "images":
        // Images are optional
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) return;

    // Log form data (in real app, this would call an API)
    console.log("Creating deck:", formData);
    onSuccess?.(formData);
    setOpen(false);
  };

  const updateFormData = <K extends keyof DeckFormData>(
    key: K,
    value: DeckFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Price management
  const addPrice = () => {
    updateFormData("prices", [
      ...formData.prices,
      { amount: "", currency: "USD" },
    ]);
  };

  const updatePrice = (index: number, field: keyof Price, value: string) => {
    const newPrices = [...formData.prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    updateFormData("prices", newPrices);
  };

  const removePrice = (index: number) => {
    if (formData.prices.length > 1) {
      updateFormData(
        "prices",
        formData.prices.filter((_, i) => i !== index)
      );
    }
  };

  // Key features management
  const addKeyFeature = () => {
    const newFeatureId = crypto.randomUUID();
    const newFeature: KeyFeature = {
      id: newFeatureId,
      title: "",
      detail: "",
      type: "QUALITY",
    };
    updateFormData("keyFeatures", [...formData.keyFeatures, newFeature]);
    setExpandedFeature(newFeatureId); // Auto-expand the new feature
  };

  const updateKeyFeature = (
    index: number,
    field: keyof KeyFeature,
    value: string
  ) => {
    const newFeatures = [...formData.keyFeatures];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    updateFormData("keyFeatures", newFeatures);
  };

  const removeKeyFeature = (index: number) => {
    updateFormData(
      "keyFeatures",
      formData.keyFeatures.filter((_, i) => i !== index)
    );
  };

  const isLastStep = currentStepIndex === STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 size-4" />
            Add Deck
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Add New Deck</DialogTitle>
          <DialogDescription>
            Create a new deck with all its details, pricing, features, and
            images.
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="px-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => {
                      // Allow navigating to previous steps
                      if (index <= currentStepIndex) {
                        setCurrentStep(step.id);
                      }
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1 transition-colors",
                      index <= currentStepIndex && "cursor-pointer",
                      index > currentStepIndex &&
                        "cursor-not-allowed opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border-2 transition-colors",
                        isActive &&
                          "border-primary bg-primary text-primary-foreground",
                        isCompleted &&
                          "border-primary bg-primary/10 text-primary",
                        !isActive &&
                          !isCompleted &&
                          "border-muted-foreground/30"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="size-5" />
                      ) : (
                        <StepIcon className="size-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium hidden sm:block",
                        isActive && "text-primary",
                        isCompleted && "text-primary",
                        !isActive && !isCompleted && "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2",
                        index < currentStepIndex ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <Separator className="mt-4" />

        {/* Step Content */}
        <ScrollArea className="flex-1 px-6">
          <div className="py-4 min-h-75">
            {/* Step 1: Basic Info */}
            {currentStep === "info" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Deck Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this deck..."
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    rows={5}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Pricing */}
            {currentStep === "pricing" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Prices</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPrice}
                  >
                    <Plus className="mr-1 size-3" />
                    Add Currency
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.prices.map((price, index) => (
                    <div key={index} className="flex items-start gap-2">
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
                              errors[`price-${index}`] && "border-destructive"
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
                </div>
              </div>
            )}

            {/* Step 3: Features */}
            {currentStep === "features" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Key Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Add features that make this deck special
                    </p>
                  </div>
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
                  <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-lg">
                    <Star className="size-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No features added yet
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addKeyFeature}
                      className="mt-2"
                    >
                      <Plus className="mr-1 size-3" />
                      Add your first feature
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="max-h-87.5 pr-3">
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
                                hasError && "border-destructive/50"
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
                                        isExpanded && "rotate-180"
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
                                      <Label htmlFor={`feature-title-${index}`}>
                                        Title{" "}
                                        <span className="text-destructive">
                                          *
                                        </span>
                                      </Label>
                                      <Input
                                        id={`feature-title-${index}`}
                                        placeholder="e.g., Premium Card Stock"
                                        value={feature.title}
                                        onChange={(e) =>
                                          updateKeyFeature(
                                            index,
                                            "title",
                                            e.target.value
                                          )
                                        }
                                        className={cn(
                                          hasError && "border-destructive"
                                        )}
                                      />
                                    </div>
                                    <div className="space-y-1.5">
                                      <Label htmlFor={`feature-type-${index}`}>
                                        Type
                                      </Label>
                                      <Select
                                        value={feature.type}
                                        onValueChange={(value) =>
                                          updateKeyFeature(index, "type", value)
                                        }
                                      >
                                        <SelectTrigger
                                          id={`feature-type-${index}`}
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
                                    <Label htmlFor={`feature-detail-${index}`}>
                                      Detail (Optional)
                                    </Label>
                                    <Textarea
                                      id={`feature-detail-${index}`}
                                      placeholder="Additional details about this feature..."
                                      value={feature.detail}
                                      onChange={(e) =>
                                        updateKeyFeature(
                                          index,
                                          "detail",
                                          e.target.value
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
                  </ScrollArea>
                )}
              </div>
            )}

            {/* Step 4: Images */}
            {currentStep === "images" && (
              <div className="space-y-4">
                <div>
                  <Label>Deck Images</Label>
                  <p className="text-sm text-muted-foreground">
                    Upload images of your deck (front, back, box, spread, etc.)
                  </p>
                </div>
                <Dropzone
                  value={formData.images}
                  onChange={(files) => updateFormData("images", files)}
                  accept="image/*"
                  maxFiles={10}
                  maxSize={5 * 1024 * 1024}
                  placeholder="Drop deck images here or click to browse"
                />
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <DialogFooter className="px-6 py-4">
          <div className="flex w-full items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              {isLastStep ? (
                <Button type="button" onClick={handleSubmit}>
                  <Check className="mr-1 size-4" />
                  Create Deck
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDeckDialog;
