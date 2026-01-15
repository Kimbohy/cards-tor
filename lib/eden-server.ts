import { treaty } from "@elysiajs/eden";
import { app } from "./elysia";

/**
 * Eden client for SERVER COMPONENTS & SERVER ACTIONS
 *
 * Uses the actual Elysia app instance for direct in-memory calls.
 * No HTTP overhead - calls are executed directly.
 *
 * ⚠️ ONLY use in Server Components, Server Actions, or API Routes
 * ❌ DO NOT import in Client Components (will break build)
 *
 * ✅ Optimal performance (no network calls)
 * ✅ Full type safety from Elysia routes
 * ✅ Direct access to server-side resources
 *
 * @example
 * ```tsx
 * // Server Component
 * import { api } from "@/lib/eden-server";
 *
 * export default async function DecksPage() {
 *   const { data } = await api.deck.get();
 *   return <div>{data.map(deck => <DeckCard key={deck.id} {...deck} />)}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Server Action
 * "use server";
 * import { api } from "@/lib/eden-server";
 *
 * export async function createDeckAction(formData: FormData) {
 *   const result = await api.deck.post({ name: formData.get("name") });
 *   revalidatePath("/decks");
 *   return result;
 * }
 * ```
 */

export const api = treaty(app).api;
