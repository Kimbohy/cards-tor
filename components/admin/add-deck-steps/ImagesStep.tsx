"use client";

import { Label } from "@/components/ui/label";
import { Dropzone, type FileWithPreview } from "@/components/ui/dropzone";
import { ImageIcon } from "lucide-react";
import { Controller, useWatch } from "react-hook-form";
import type { ImagesStepProps } from "./types";

export function ImagesStep({ control, errors }: ImagesStepProps) {
  const images = useWatch({ control, name: "images" });

  return (
    <div className="space-y-4">
      <div>
        <Label>Deck Images</Label>
        <p className="text-sm text-muted-foreground">
          Add images for this deck (optional)
        </p>
      </div>

      <Controller
        control={control}
        name="images"
        render={({ field }) => (
          <Dropzone
            value={field.value as unknown as FileWithPreview[]}
            onChange={(files) => field.onChange(files)}
            accept="image/*"
            maxFiles={10}
            maxSize={5 * 1024 * 1024}
            placeholder="Drop images here or click to browse"
          />
        )}
      />

      {errors.images && (
        <p className="text-sm text-destructive">
          {typeof errors.images.message === "string"
            ? errors.images.message
            : "Please check your images"}
        </p>
      )}

      {/* {(!images || images.length === 0) && (
        <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-lg mt-4">
          <ImageIcon className="size-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No images yet</p>
        </div>
      )} */}
    </div>
  );
}
