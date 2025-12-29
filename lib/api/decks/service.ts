import { deckRepository } from "./repository";
import type {
  CreateDeckInput,
  UpdateDeckInput,
  CreateImageInput,
  CreatePriceInput,
} from "./schema";

/**
 * 🎯 Service pour les Decks
 *
 * Responsabilité : logique métier
 * - Validation business (règles métier)
 * - Orchestration (appel de plusieurs repos)
 * - Transformation des données
 * - Gestion des erreurs métier
 */

// Erreur personnalisée pour "not found"
export class DeckNotFoundError extends Error {
  constructor(id: string) {
    super(`Deck avec l'ID "${id}" non trouvé`);
    this.name = "DeckNotFoundError";
  }
}

export const deckService = {
  /**
   * Créer un nouveau deck
   */
  async create(data: CreateDeckInput) {
    // Ici tu pourrais ajouter des règles métier
    // Ex: vérifier que le nom n'existe pas déjà
    // Ex: limiter le nombre de decks par utilisateur

    const deck = await deckRepository.create(data);
    return deck;
  },

  /**
   * Lister tous les decks
   */
  async getAll() {
    const decks = await deckRepository.findMany();
    return {
      items: decks,
      count: decks.length,
    };
  },

  /**
   * Récupérer un deck par ID
   */
  async getById(id: string) {
    const deck = await deckRepository.findById(id);

    if (!deck) {
      throw new DeckNotFoundError(id);
    }

    return deck;
  },

  /**
   * Mettre à jour un deck
   */
  async update(id: string, data: UpdateDeckInput) {
    // Vérifier que le deck existe
    const exists = await deckRepository.exists(id);
    if (!exists) {
      throw new DeckNotFoundError(id);
    }

    return deckRepository.update(id, data);
  },

  /**
   * Supprimer un deck
   */
  async delete(id: string) {
    const exists = await deckRepository.exists(id);
    if (!exists) {
      throw new DeckNotFoundError(id);
    }

    await deckRepository.delete(id);
    return { deleted: true };
  },

  /**
   * Ajouter une image à un deck
   */
  async addImage(deckId: string, data: CreateImageInput) {
    const exists = await deckRepository.exists(deckId);
    if (!exists) {
      throw new DeckNotFoundError(deckId);
    }

    return deckRepository.addImage(deckId, data);
  },

  /**
   * Ajouter un prix à un deck
   */
  async addPrice(deckId: string, data: CreatePriceInput) {
    const exists = await deckRepository.exists(deckId);
    if (!exists) {
      throw new DeckNotFoundError(deckId);
    }

    return deckRepository.addPrice(deckId, data);
  },
};
