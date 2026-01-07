import {
  DeckPlainInputCreate,
  ImagePlainInputCreate,
  KeyFeaturePlainInputCreate,
  PricePlainInputCreate,
} from "@/generated/prismabox/barrel";
import { t } from "elysia";

/**
 * Schemas for Deck API
 */

export const CreateDeckSchema = t.Object({
  ...DeckPlainInputCreate.properties,
  prices: t.Optional(t.Array(t.Object(PricePlainInputCreate.properties))),
  keyFeatures: t.Optional(
    t.Array(t.Object(KeyFeaturePlainInputCreate.properties))
  ),
  images: t.Optional(t.Array(t.Object(ImagePlainInputCreate.properties))),
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

export type CreateDeckSchemaType = typeof CreateDeckSchema.static;
export type PaginationParamsType = typeof PaginationParams.static;
