import { treaty } from "@elysiajs/eden";
import type { app } from "./elysia";

/**
 * Eden client for CLIENT COMPONENTS
 *
 * Uses type-only import to avoid bundling server code in the client bundle.
 * Makes HTTP requests to the API endpoints.
 *
 * ✅ Safe to use in "use client" components
 * ✅ Full type safety from Elysia routes
 * ✅ No server dependencies in client bundle
 *
 * @example
 * ```tsx
 * "use client";
 * import { api } from "@/lib/eden-client";
 *
 * export function MyComponent() {
 *   const handleSubmit = async (data) => {
 *     const { data: result, error } = await api.deck.post(data);
 *     if (error) console.error(error);
 *   };
 * }
 * ```
 */

type App = typeof app;

export const api = treaty<App>(
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    : window.location.origin
).api;
