import { Elysia } from "elysia";
import { deckService, DeckNotFoundError } from "./service";
import {
  CreateDeckSchema,
  UpdateDeckSchema,
  CreateImageSchema,
  CreatePriceSchema,
  IdParamSchema,
} from "./schema";

/**
 * 🛣️ Routes API pour les Decks
 *
 * Responsabilité : couche HTTP
 * - Définir les endpoints
 * - Valider les inputs (schémas)
 * - Appeler le service
 * - Gérer les erreurs HTTP
 * - Retourner les réponses formatées
 */

export const decksApi = new Elysia({ prefix: "/decks" })
  // Gestionnaire d'erreurs pour ce module
  .onError(({ error, set }) => {
    if (error instanceof DeckNotFoundError) {
      set.status = 404;
      return {
        success: false,
        message: error.message,
      };
    }
    // Laisser passer les autres erreurs
    throw error;
  })

  // POST /api/decks - Créer un deck
  .post(
    "/",
    async ({ body, set }) => {
      const deck = await deckService.create(body);
      set.status = 201;
      return { success: true, data: deck };
    },
    {
      body: CreateDeckSchema,
      detail: { summary: "Créer un deck", tags: ["Decks"] },
    }
  )

  // GET /api/decks - Lister tous les decks
  .get(
    "/",
    async () => {
      const result = await deckService.getAll();
      return { success: true, data: result.items, count: result.count };
    },
    {
      detail: { summary: "Lister les decks", tags: ["Decks"] },
    }
  )

  // GET /api/decks/:id - Récupérer un deck
  .get(
    "/:id",
    async ({ params }) => {
      const deck = await deckService.getById(params.id);
      return { success: true, data: deck };
    },
    {
      params: IdParamSchema,
      detail: { summary: "Récupérer un deck", tags: ["Decks"] },
    }
  )

  // PATCH /api/decks/:id - Mettre à jour un deck
  .patch(
    "/:id",
    async ({ params, body }) => {
      const deck = await deckService.update(params.id, body);
      return { success: true, data: deck };
    },
    {
      params: IdParamSchema,
      body: UpdateDeckSchema,
      detail: { summary: "Mettre à jour un deck", tags: ["Decks"] },
    }
  )

  // DELETE /api/decks/:id - Supprimer un deck
  .delete(
    "/:id",
    async ({ params, set }) => {
      await deckService.delete(params.id);
      set.status = 204;
      return null;
    },
    {
      params: IdParamSchema,
      detail: { summary: "Supprimer un deck", tags: ["Decks"] },
    }
  )

  // POST /api/decks/:id/images - Ajouter une image
  .post(
    "/:id/images",
    async ({ params, body, set }) => {
      const image = await deckService.addImage(params.id, body);
      set.status = 201;
      return { success: true, data: image };
    },
    {
      params: IdParamSchema,
      body: CreateImageSchema,
      detail: { summary: "Ajouter une image", tags: ["Decks"] },
    }
  )

  // POST /api/decks/:id/prices - Ajouter un prix
  .post(
    "/:id/prices",
    async ({ params, body, set }) => {
      const price = await deckService.addPrice(params.id, body);
      set.status = 201;
      return { success: true, data: price };
    },
    {
      params: IdParamSchema,
      body: CreatePriceSchema,
      detail: { summary: "Ajouter un prix", tags: ["Decks"] },
    }
  );
