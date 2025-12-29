import { prisma } from "../../prisma";
import type {
  CreateDeckInput,
  UpdateDeckInput,
  CreateImageInput,
  CreatePriceInput,
} from "./schema";

/**
 * 💾 Repository pour les Decks
 *
 * Responsabilité unique : accès aux données (Prisma)
 * - Pas de logique métier ici
 * - Juste des requêtes CRUD
 * - Retourne les données brutes
 */

// Sélection par défaut pour les listes
const deckListSelect = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  images: {
    take: 1,
    select: { url: true, altText: true },
  },
  prices: {
    orderBy: { createdAt: "desc" as const },
    take: 1,
    select: { amount: true, currency: true },
  },
};

// Sélection complète pour le détail
const deckDetailSelect = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  images: {
    select: { id: true, url: true, altText: true },
  },
  prices: {
    orderBy: { createdAt: "desc" as const },
    select: { id: true, amount: true, currency: true, createdAt: true },
  },
};

export const deckRepository = {
  /**
   * Créer un deck
   */
  async create(data: CreateDeckInput) {
    return prisma.deck.create({
      data: {
        name: data.name,
        description: data.description,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        images: true,
        prices: true,
      },
    });
  },

  /**
   * Lister tous les decks
   */
  async findMany() {
    return prisma.deck.findMany({
      orderBy: { createdAt: "desc" },
      select: deckListSelect,
    });
  },

  /**
   * Trouver un deck par ID
   */
  async findById(id: string) {
    return prisma.deck.findUnique({
      where: { id },
      select: deckDetailSelect,
    });
  },

  /**
   * Mettre à jour un deck
   */
  async update(id: string, data: UpdateDeckInput) {
    return prisma.deck.update({
      where: { id },
      data,
      select: deckDetailSelect,
    });
  },

  /**
   * Supprimer un deck
   */
  async delete(id: string) {
    return prisma.deck.delete({
      where: { id },
    });
  },

  /**
   * Vérifier si un deck existe
   */
  async exists(id: string) {
    const deck = await prisma.deck.findUnique({
      where: { id },
      select: { id: true },
    });
    return deck !== null;
  },

  /**
   * Ajouter une image à un deck
   */
  async addImage(deckId: string, data: CreateImageInput) {
    return prisma.image.create({
      data: {
        deckId,
        url: data.url,
        altText: data.altText,
      },
      select: {
        id: true,
        url: true,
        altText: true,
        createdAt: true,
      },
    });
  },

  /**
   * Ajouter un prix à un deck
   */
  async addPrice(deckId: string, data: CreatePriceInput) {
    return prisma.price.create({
      data: {
        deckId,
        amount: data.amount,
        currency: data.currency || "USD",
      },
      select: {
        id: true,
        amount: true,
        currency: true,
        createdAt: true,
      },
    });
  },
};
