import { Elysia, t } from "elysia";
import { DeckNotFoundError, deckService } from "./deck.service";
import { CreateDeckSchema, PaginationParams } from "./deck.schema";
import { DeckInputCreate } from "@/generated/prismabox/Deck";

/**
 * Rout API for Decks
 */

export const deckApi = new Elysia({ prefix: "/deck" })
  .post(
    "/",
    async ({ body, set }) => {
      const deck = await deckService.create(body);
      set.status = 201;
      return { success: true, data: deck };
    },
    {
      body: CreateDeckSchema,
      detail: {
        summary: "Create a new deck",
        tags: ["Decks"],
      },
    }
  )

  .get(
    "/",
    async ({ query, set }) => {
      const { decks, pagination } = await deckService.getAll(query);
      set.status = 200;
      return { success: true, data: decks, pagination };
    },
    {
      query: PaginationParams,
      detail: {
        summary: "Get all decks",
        tags: ["Decks"],
      },
    }
  );
