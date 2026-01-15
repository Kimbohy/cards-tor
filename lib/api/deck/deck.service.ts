import { prisma } from "@/lib/prisma";
import { CreateDeckInput, PaginationParamsType } from "./deck.schema";
// Custom error for deck not found
export class DeckNotFoundError extends Error {
  constructor(id: string) {
    super(`Deck with ID ${id} not found.`);
    this.name = "DeckNotFoundError";
  }
}

export const deckService = {
  async create(data: CreateDeckInput) {
    // An transaction to create a deck along with its price and key features
    const deck = await prisma.deck.create({
      data: {
        name: data.name,
        description: data.description,
        prices: {
          create: data.prices,
        },
        keyFeatures: {
          create: data.keyFeatures,
        },
        images: {
          create: data.images,
        },
      },
    });
    return deck;
  },

  async getAll(query: PaginationParamsType) {
    const decks = await prisma.deck.findMany({
      include: {
        prices: true,
        keyFeatures: true,
        images: true,
      },
      skip:
        query?.page && query?.limit
          ? (query.page - 1) * query.limit
          : undefined,
      take: query?.limit,
      orderBy: query?.orderBy,
    });
    const total = await prisma.deck.count();
    return {
      decks,
      pagination: {
        total,
        page: query?.page || 1,
        limit: query?.limit || total,
      },
    };
  },
};
