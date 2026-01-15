/**
 * Eden API Client - Smart Export
 *
 * This file provides a context-aware API client that automatically uses
 * the appropriate implementation based on the execution environment.
 *
 * ⚠️ RECOMMENDED: Use specific imports instead for better clarity:
 * - Client Components: `import { api } from "@/lib/eden-client"`
 * - Server Components: `import { api } from "@/lib/eden-server"`
 *
 * This smart export is useful for shared utilities that run in both contexts.
 *
 * @see {@link ./eden-client.ts} for client-side usage
 * @see {@link ./eden-server.ts} for server-side usage
 */

/**
 * Context-aware API client
 *
 * - Server-side: Uses direct in-memory calls (optimal performance)
 * - Client-side: Uses HTTP requests (type-safe)
 */
export const api =
  typeof window === "undefined"
    ? // Server: Import the optimized server client
      import("./eden-server").then((m) => m.api)
    : // Client: Import the client-safe client
      import("./eden-client").then((m) => m.api);

/**
 * For synchronous imports, use the specific clients:
 *
 * @example Client Component
 * ```tsx
 * "use client";
 * import { api } from "@/lib/eden-client";
 * ```
 *
 * @example Server Component
 * ```tsx
 * import { api } from "@/lib/eden-server";
 * ```
 */

// Re-export for convenience
export type { api as Api } from "./eden-client";
