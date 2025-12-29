import { t } from "elysia";

/**
 * 📋 Schémas de validation pour les Decks
 *
 * Centraliser les schémas permet de :
 * - Les réutiliser (create, update, etc.)
 * - Les tester indépendamment
 * - Générer de la documentation
 */

// Schéma de création
export const CreateDeckSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  description: t.Optional(t.String({ maxLength: 500 })),
});

// Schéma de mise à jour (tous les champs optionnels)
export const UpdateDeckSchema = t.Object({
  name: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  description: t.Optional(t.String({ maxLength: 500 })),
});

// Schéma pour ajouter une image
export const CreateImageSchema = t.Object({
  url: t.String(),
  altText: t.Optional(t.String({ maxLength: 200 })),
});

// Schéma pour ajouter un prix
export const CreatePriceSchema = t.Object({
  amount: t.Number({ minimum: 0 }),
  currency: t.Optional(t.String()),
});

// Schéma pour les paramètres d'ID
export const IdParamSchema = t.Object({
  id: t.String(),
});

// Types inférés (utiles pour TypeScript)
export type CreateDeckInput = typeof CreateDeckSchema.static;
export type UpdateDeckInput = typeof UpdateDeckSchema.static;
export type CreateImageInput = typeof CreateImageSchema.static;
export type CreatePriceInput = typeof CreatePriceSchema.static;
