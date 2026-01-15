import type { Static } from "elysia";
import { CreateDeckSchema } from "./deck.schema";
import {
  KeyFeaturePlainInputCreate,
  PricePlainInputCreate,
  ImagePlainInputCreate,
  KeyFeatureType,
} from "@/generated/prismabox/barrel";
import type { FileWithPreview } from "@/components/ui/dropzone";

/**
 * Centralized types for Deck API - derived from schemas
 * This ensures type consistency between client and server
 */

// Main type for creating a deck (derived from Elysia schema)
export type CreateDeckInput = Static<typeof CreateDeckSchema>;

// Sub-types for nested objects (derived from prismabox schemas)
export type PriceInput = Static<typeof PricePlainInputCreate>;
export type KeyFeatureInput = Static<typeof KeyFeaturePlainInputCreate>;
export type ImageInput = Static<typeof ImagePlainInputCreate>;
export type KeyFeatureTypeValue = Static<typeof KeyFeatureType>;

// Array of key feature types for UI components
export const KEY_FEATURE_TYPES: readonly KeyFeatureTypeValue[] = [
  "QUALITY",
  "DESIGN",
  "USABILITY",
  "DURABILITY",
  "UNIQUENESS",
  "PRODUCTION",
  "PRICE",
] as const;

/**
 * Form-specific type that extends the API type with UI-specific fields
 * This handles the differences between form state and API payload
 */
export interface DeckFormData {
  name: string;
  description: string;
  prices: PriceFormInput[];
  keyFeatures: KeyFeatureFormInput[];
  images: FileWithPreview[]; // Uses FileWithPreview for form, converted to ImageInput on submit
}

// Form input types with UI-specific fields
export interface PriceFormInput {
  amount: string; // String for input handling, converted to number on submit
  currency: string;
}

export interface KeyFeatureFormInput {
  id: string; // Local ID for React keys
  title: string;
  detail: string;
  type: KeyFeatureTypeValue;
}

/**
 * Transforms form data to API-compatible format
 * Handles type conversions and removes UI-specific fields
 *
 * Note: Images require upload to a storage service first.
 * This function expects URLs to already be available or
 * the upload logic to be handled separately.
 */
export function transformFormDataToApiInput(
  formData: DeckFormData,
  uploadedImageUrls?: { url: string; altText?: string }[]
): CreateDeckInput {
  return {
    name: formData.name,
    description: formData.description || null,
    prices: formData.prices
      .filter((p) => p.amount && parseFloat(p.amount) > 0)
      .map((p) => ({
        amount: parseFloat(p.amount),
        currency: p.currency || "USD",
      })),
    keyFeatures: formData.keyFeatures
      .filter((f) => f.title.trim())
      .map((f) => ({
        title: f.title,
        detail: f.detail || null,
        type: f.type,
      })),
    // If uploaded URLs are provided, use them; otherwise, use preview URLs (for local dev)
    images: uploadedImageUrls
      ? uploadedImageUrls.map((img) => ({
          url: img.url,
          altText: img.altText || null,
        }))
      : formData.images
          .filter((img) => img.preview)
          .map((img) => ({
            url: img.preview!, // Use preview URL temporarily (should be replaced with actual upload)
            altText: img.name || null,
          })),
  };
}

/**
 * Initial form data factory
 */
export function createInitialFormData(): DeckFormData {
  return {
    name: "",
    description: "",
    prices: [{ amount: "", currency: "USD" }],
    keyFeatures: [],
    images: [],
  };
}
