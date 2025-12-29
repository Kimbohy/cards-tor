import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Export des méthodes pour un usage facile
export const { signIn, signUp, signOut, useSession } = authClient;
