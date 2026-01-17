"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ChevronLeft,
  ChevronRight,
  Package,
  DollarSign,
  Star,
  ImageIcon,
  Check,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import React from "react";
import { api } from "@/lib/eden-client";

// React Hook Form imports
import { useForm, useFieldArray } from "react-hook-form";
import { typeboxResolver } from "@hookform/resolvers/typebox";

// Import schema and types
import {
  CreateDeckSchema,
  type CreateDeckInput,
} from "@/lib/api/deck/deck.schema";

// Import step components
import {
  InfoStep,
  PricingStep,
  FeaturesStep,
  ImagesStep,
} from "./add-deck-steps";

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
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

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
      setIsReadyToSubmit(false);
    }
  }, [open, reset]);

  // Validate current step fields
  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case "info":
        return await triggerValidation(["name", "description"], {
          shouldFocus: true,
        });
      case "pricing":
        return await triggerValidation("prices", { shouldFocus: true });
      case "features":
        return await triggerValidation("keyFeatures", { shouldFocus: true });
      case "images":
        // Always return true for images since they're optional
        // Individual image URLs are validated if present
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    // Prevent rapid clicking
    if (isSubmitting) return;

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
    // Prevent submission unless user explicitly clicked submit
    if (!isReadyToSubmit) {
      return;
    }

    setApiError(null);

    try {
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

      onSuccess?.(data);
      setOpen(false);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "info":
        return (
          <InfoStep register={register} control={control} errors={errors} />
        );
      case "pricing":
        return (
          <PricingStep
            register={register}
            control={control}
            errors={errors}
            priceFields={priceFields}
            appendPrice={appendPrice}
            removePrice={removePrice}
          />
        );
      case "features":
        return (
          <FeaturesStep
            register={register}
            control={control}
            errors={errors}
            featureFields={featureFields}
            appendFeature={appendFeature}
            removeFeature={removeFeature}
            watchedFeatures={watchedFeatures}
            expandedFeature={expandedFeature}
            setExpandedFeature={setExpandedFeature}
          />
        );
      case "images":
        return (
          <ImagesStep register={register} control={control} errors={errors} />
        );
      default:
        return null;
    }
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
                        "cursor-not-allowed opacity-50",
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
                          "border-muted-foreground/30",
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
                        !isActive && !isCompleted && "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2",
                        index < currentStepIndex ? "bg-primary" : "bg-muted",
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            // Prevent Enter key from submitting the form
            if (e.key === "Enter" && !isReadyToSubmit) {
              e.preventDefault();
            }
          }}
        >
          <ScrollArea className="flex-1 px-6">
            <div className="py-4 min-h-75">{renderStepContent()}</div>
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
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => setIsReadyToSubmit(true)}
                  >
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
