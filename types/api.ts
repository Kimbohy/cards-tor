import type { api } from "@/lib/eden-client";

/**
 * Inferred types from API endpoints
 */

// Deck types
export type DecksResponse = Awaited<ReturnType<typeof api.deck.get>>["data"];
export type Deck = NonNullable<DecksResponse>["decks"][number];

// Re-export for convenience
export type DeckImage = Deck["images"][number];
export type DeckPrice = Deck["prices"][number];
export type DeckKeyFeature = Deck["keyFeatures"][number];
