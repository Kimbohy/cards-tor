"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, X, ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { KEY_FEATURE_TYPES } from "@/lib/api/deck/deck.schema";
import type { FeaturesStepProps, KeyFeatureType } from "./types";

export function FeaturesStep({
  register,
  control,
  errors,
  featureFields,
  appendFeature,
  removeFeature,
  watchedFeatures,
  expandedFeature,
  setExpandedFeature,
}: FeaturesStepProps) {
  const addKeyFeature = () => {
    appendFeature({ title: "", detail: null, type: "QUALITY" });
    // Note: We can't set expanded feature by id here since useFieldArray generates the id
    // The parent component handles this via setExpandedFeature
  };

  return (
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
          <p className="text-sm text-muted-foreground">No features added yet</p>
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
                          <Badge variant="outline" className="shrink-0 text-xs">
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
                            <Label htmlFor={`feature-title-${index}`}>
                              Title <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id={`feature-title-${index}`}
                              placeholder="e.g., Premium Card Stock"
                              {...register(`keyFeatures.${index}.title`)}
                              className={cn(
                                errors.keyFeatures?.[index]?.title &&
                                  "border-destructive"
                              )}
                            />
                            {errors.keyFeatures?.[index]?.title && (
                              <p className="text-sm text-destructive">
                                {errors.keyFeatures[index]?.title?.message ||
                                  "Title is required"}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`feature-type-${index}`}>
                              Type
                            </Label>
                            <Controller
                              control={control}
                              name={`keyFeatures.${index}.type`}
                              render={({ field }) => (
                                <Select
                                  value={field.value || "QUALITY"}
                                  onValueChange={(value: KeyFeatureType) =>
                                    field.onChange(value)
                                  }
                                >
                                  <SelectTrigger id={`feature-type-${index}`}>
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
                              )}
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor={`feature-detail-${index}`}>
                            Detail (Optional)
                          </Label>
                          <Textarea
                            id={`feature-detail-${index}`}
                            placeholder="Additional details about this feature..."
                            {...register(`keyFeatures.${index}.detail`)}
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
  );
}
