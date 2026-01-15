"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import type { PricingStepProps } from "./types";

export function PricingStep({
  register,
  control,
  errors,
  priceFields,
  appendPrice,
  removePrice,
}: PricingStepProps) {
  const addPrice = () => {
    appendPrice({ amount: 0, currency: "USD" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Prices</Label>
        <Button type="button" variant="outline" size="sm" onClick={addPrice}>
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
                    errors.prices?.[index]?.amount && "border-destructive"
                  )}
                />
                <Controller
                  control={control}
                  name={`prices.${index}.currency`}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
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
  );
}
