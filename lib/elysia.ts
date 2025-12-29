import { Elysia } from "elysia";
import { auth } from "./auth";

// Plugin Better Auth avec macro pour protéger les routes
const betterAuthPlugin = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({ headers });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

// Instance Elysia principale
export const app = new Elysia({ prefix: "/api" })
  .use(betterAuthPlugin)
  // Route de test
  .get("/hello", () => ({ message: "Hello from Elysia!" }))
  // Route protégée (nécessite une session)
  .get("/me", ({ user }) => user, { auth: true })
  // Ajoute tes autres routes API ici
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }));

// Export du type pour Eden (type-safety côté client)
export type App = typeof app;
