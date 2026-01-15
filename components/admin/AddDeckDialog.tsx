"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
  Loader2,
  UndoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import React from "react";
import { api } from "@/lib/eden-client";

// React Hook Form imports
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { typeboxResolver } from "@hookform/resolvers/typebox";

// Import schema and types directly from schema file (not index.ts to avoid server-side imports)
import {
  CreateDeckSchema,
  type CreateDeckInput,
  type KeyFeatureType,
  KEY_FEATURE_TYPES,
} from "@/lib/api/deck/deck.schema";

const STEPS = [
  { id: "info", label: "Basic Info", icon: Package },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "features", label: "Features", icon: Star },
  { id: "images", label: "Images", icon: ImageIcon },
] as const;

type StepId = (typeof STEPS)[number]["id"];

interface AddDeckDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: (data: CreateDeckInput) => void;
}

export function AddDeckDialog({ trigger, onSuccess }: AddDeckDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepId>("info");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // React Hook Form setup with TypeBox resolver
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger: triggerValidation,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateDeckInput>({
    resolver: typeboxResolver(CreateDeckSchema),
    defaultValues: {
      name: undefined,
      description: null,
      prices: [{ amount: 0, currency: "USD" }],
      keyFeatures: [],
      images: [],
    },
  });

  // Field arrays for dynamic lists
  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({ control, name: "prices" });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "keyFeatures" });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const isLastStep = currentStepIndex === STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Watch values for UI
  const watchedFeatures = watch("keyFeatures");

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      reset({
        name: undefined,
        description: null,
        prices: [{ amount: 0, currency: "USD" }],
        keyFeatures: [],
        images: [],
      });
      setCurrentStep("info");
      setExpandedFeature(null);
      setApiError(null);
    }
  }, [open, reset]);

  // Validate current step fields
  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case "info":
        return triggerValidation(["name", "description"]);
      case "pricing":
        return triggerValidation("prices");
      case "features":
        return triggerValidation("keyFeatures");
      case "images":
        return triggerValidation("images");
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

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

  // Submit handler
  const onSubmit = async (data: CreateDeckInput) => {
    setApiError(null);

    try {
      // Data is already validated and typed correctly - send directly to API
      const { data: responseData, error } = await api.deck.post(data);

      if (error) {
        const errorMessage =
          typeof error.value === "object" && error.value !== null
            ? (error.value as { message?: string }).message ||
              "Failed to create deck"
            : "Failed to create deck";
        setApiError(errorMessage);
        return;
      }

      // Success
      onSuccess?.(data);
      setOpen(false);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  // Add new price
  const addPrice = () => {
    appendPrice({ amount: 0, currency: "USD" });
  };

  // Add new key feature
  const addKeyFeature = () => {
    const newId = crypto.randomUUID();
    appendFeature({ title: "", detail: null, type: "QUALITY" });
    setExpandedFeature(newId);
  };

  // Add new image
  const addImage = () => {
    appendImage({ url: "", altText: null });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("name")}
                      className={cn(errors.name && "border-destructive")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message || "Deck name is required"}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe this deck..."
                      {...register("description")}
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
                    {priceFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-2">
                        <div className="flex-1 space-y-1">
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              {...register(`prices.${index}.amount`, {
                                valueAsNumber: true,
                              })}
                              className={cn(
                                "flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                                errors.prices?.[index]?.amount &&
                                  "border-destructive"
                              )}
                            />
                            <Controller
                              control={control}
                              name={`prices.${index}.currency`}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
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
                              )}
                            />
                          </div>
                          {errors.prices?.[index]?.amount && (
                            <p className="text-sm text-destructive">
                              {errors.prices[index]?.amount?.message ||
                                "Valid price is required"}
                            </p>
                          )}
                        </div>
                        {priceFields.length > 1 && (
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
                      disabled={featureFields.length >= 10}
                    >
                      <Plus className="mr-1 size-3" />
                      Add Feature
                    </Button>
                  </div>

                  {featureFields.length === 0 ? (
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
                        {featureFields.map((field, index) => {
                          const isExpanded = expandedFeature === field.id;
                          const hasError = errors.keyFeatures?.[index];
                          const featureValue = watchedFeatures?.[index];
                          const displayTitle =
                            featureValue?.title || `Feature ${index + 1}`;
                          const typeLabel = featureValue?.type
                            ? featureValue.type.charAt(0) +
                              featureValue.type.slice(1).toLowerCase()
                            : "Quality";

                          return (
                            <Collapsible
                              key={field.id}
                              open={isExpanded}
                              onOpenChange={(open) =>
                                setExpandedFeature(open ? field.id : null)
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
                                    onClick={() => removeFeature(index)}
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
                                          htmlFor={`feature-title-${index}`}
                                        >
                                          Title{" "}
                                          <span className="text-destructive">
                                            *
                                          </span>
                                        </Label>
                                        <Input
                                          id={`feature-title-${index}`}
                                          placeholder="e.g., Premium Card Stock"
                                          {...register(
                                            `keyFeatures.${index}.title`
                                          )}
                                          className={cn(
                                            errors.keyFeatures?.[index]
                                              ?.title && "border-destructive"
                                          )}
                                        />
                                        {errors.keyFeatures?.[index]?.title && (
                                          <p className="text-sm text-destructive">
                                            {errors.keyFeatures[index]?.title
                                              ?.message || "Title is required"}
                                          </p>
                                        )}
                                      </div>
                                      <div className="space-y-1.5">
                                        <Label
                                          htmlFor={`feature-type-${index}`}
                                        >
                                          Type
                                        </Label>
                                        <Controller
                                          control={control}
                                          name={`keyFeatures.${index}.type`}
                                          render={({ field }) => (
                                            <Select
                                              value={field.value || "QUALITY"}
                                              onValueChange={(
                                                value: KeyFeatureType
                                              ) => field.onChange(value)}
                                            >
                                              <SelectTrigger
                                                id={`feature-type-${index}`}
                                              >
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {KEY_FEATURE_TYPES.map(
                                                  (type) => (
                                                    <SelectItem
                                                      key={type}
                                                      value={type}
                                                    >
                                                      {type.charAt(0) +
                                                        type
                                                          .slice(1)
                                                          .toLowerCase()}
                                                    </SelectItem>
                                                  )
                                                )}
                                              </SelectContent>
                                            </Select>
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-1.5">
                                      <Label
                                        htmlFor={`feature-detail-${index}`}
                                      >
                                        Detail (Optional)
                                      </Label>
                                      <Textarea
                                        id={`feature-detail-${index}`}
                                        placeholder="Additional details about this feature..."
                                        {...register(
                                          `keyFeatures.${index}.detail`
                                        )}
                                        rows={2}
                                      />
                                    </div>
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
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Deck Images</Label>
                      <p className="text-sm text-muted-foreground">
                        Add image URLs for your deck (front, back, box, spread,
                        etc.)
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addImage}
                      disabled={imageFields.length >= 10}
                    >
                      <Plus className="mr-1 size-3" />
                      Add Image
                    </Button>
                  </div>

                  {imageFields.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-lg">
                      <ImageIcon className="size-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No images added yet
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addImage}
                        className="mt-2"
                      >
                        <Plus className="mr-1 size-3" />
                        Add your first image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {imageFields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-2">
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder="Image URL (e.g., https://...)"
                              {...register(`images.${index}.url`)}
                              className={cn(
                                errors.images?.[index]?.url &&
                                  "border-destructive"
                              )}
                            />
                            {errors.images?.[index]?.url && (
                              <p className="text-sm text-destructive">
                                {errors.images[index]?.url?.message ||
                                  "Valid URL is required"}
                              </p>
                            )}
                            <Input
                              placeholder="Alt text (optional)"
                              {...register(`images.${index}.altText`)}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeImage(index)}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* API Error Display */}
          {apiError && (
            <div className="px-6 py-2">
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-sm text-destructive">{apiError}</p>
              </div>
            </div>
          )}

          <DialogFooter className="px-6 py-4">
            <div className="flex w-full items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstStep || isSubmitting}
              >
                <ChevronLeft className="mr-1 size-4" />
                Previous
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                {isLastStep ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1 size-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="mr-1 size-4" />
                        Create Deck
                      </>
                    )}
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddDeckDialog;
