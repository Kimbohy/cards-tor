import {
  DeckPlainInputCreate,
  ImagePlainInputCreate,
  KeyFeaturePlainInputCreate,
  PricePlainInputCreate,
} from "@/generated/prismabox/barrel";
import { t, type Static } from "elysia";

/**
 * Schemas for Deck API - Single Source of Truth
 * These schemas are used for:
 * 1. Runtime validation on the server (Elysia)
 * 2. Type inference for client-side code (Static<typeof Schema>)
 * 3. Form validation with React Hook Form (@hookform/resolvers/typebox)
 */

// Sub-schemas for nested objects (re-exported for form field arrays)
export const PriceInputSchema = t.Object(PricePlainInputCreate.properties);

// Override KeyFeature schema to add validation
export const KeyFeatureInputSchema = t.Object({
  title: t.String({ minLength: 1 }),
  detail: t.Optional(t.Union([t.String(), t.Null()])),
  type: t.Optional(
    t.Union(
      [
        t.Literal("QUALITY"),
        t.Literal("DESIGN"),
        t.Literal("USABILITY"),
        t.Literal("DURABILITY"),
        t.Literal("UNIQUENESS"),
        t.Literal("PRODUCTION"),
        t.Literal("PRICE"),
      ],
      { additionalProperties: false }
    )
  ),
});

export const ImageInputSchema = t.Object(ImagePlainInputCreate.properties);

// Main schema for creating a deck
export const CreateDeckSchema = t.Object({
  ...DeckPlainInputCreate.properties,
  prices: t.Optional(t.Array(PriceInputSchema)),
  keyFeatures: t.Optional(t.Array(KeyFeatureInputSchema)),
  images: t.Optional(t.Array(ImageInputSchema)),
});

export const PaginationParams = t.Optional(
  t.Object({
    page: t.Optional(t.Number()),
    limit: t.Optional(t.Number()),
    orderBy: t.Optional(
      t.Object({
        createdAt: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
      })
    ),
  })
);

// Type exports using Static for type inference from schemas
export type CreateDeckInput = Static<typeof CreateDeckSchema>;
export type PriceInput = Static<typeof PriceInputSchema>;
export type KeyFeatureInput = Static<typeof KeyFeatureInputSchema>;
export type ImageInput = Static<typeof ImageInputSchema>;
export type PaginationParamsType = Static<typeof PaginationParams>;

// Key feature types constant for UI (derived from schema)
export const KEY_FEATURE_TYPES = [
  "QUALITY",
  "DESIGN",
  "USABILITY",
  "DURABILITY",
  "UNIQUENESS",
  "PRODUCTION",
  "PRICE",
] as const;

export type KeyFeatureType = (typeof KEY_FEATURE_TYPES)[number];
