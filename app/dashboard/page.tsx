"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [apiData, setApiData] = useState<{
    message?: string;
    status?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Rediriger si non connecté
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Test de l'API Elysia
  const testElysiaApi = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setApiData(data);
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Test de la route protégée
  const testProtectedRoute = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setApiData(data);
      } else {
        setApiData({ message: `Erreur ${res.status}: ${res.statusText}` });
      }
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* User Info Card */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Informations utilisateur
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Nom</p>
                <p className="font-medium text-zinc-900 dark:text-white">
                  {session.user.name || "Non défini"}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Email
                </p>
                <p className="font-medium text-zinc-900 dark:text-white">
                  {session.user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">ID</p>
                <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                  {session.user.id}
                </p>
              </div>
            </div>
          </div>

          {/* API Test Card */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Test API Elysia
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={testElysiaApi}
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  GET /api/hello
                </button>
                <button
                  onClick={testProtectedRoute}
                  disabled={loading}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                >
                  GET /api/me (protégé)
                </button>
              </div>
              {apiData && (
                <pre className="rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
