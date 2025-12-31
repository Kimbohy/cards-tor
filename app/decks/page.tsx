"use client";

import { useState, useEffect } from "react";

// Types for decks
interface Deck {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  images: { url: string; altText: string | null }[];
  prices: { amount: number; currency: string }[];
}

interface CreateDeckData {
  name: string;
  description?: string;
}

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Load decks on mount
  useEffect(() => {
    fetchDecks();
  }, []);

  // Load decks
  const fetchDecks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/decks");
      const data = await res.json();

      if (res.ok && data.success) {
        setDecks(data.data);
      } else {
        setError(data.message || "Loading error");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  // Create a deck
  const createDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const deckData: CreateDeckData = {
      name,
      description: description || undefined,
    };

    try {
      const res = await fetch("/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deckData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Add deck to list
        setDecks((prev) => [data.data, ...prev]);
        // Reset form
        setName("");
        setDescription("");
      } else {
        setError(data.message || "Creation error");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
          🃏 My Card Decks
        </h1>

        {/* Creation form */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Create a new deck
          </h2>

          <form onSubmit={createDeck} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">
                  Deck name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Bicycle Classic"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Classic red deck"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !name}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create deck"}
              </button>
              <button
                type="button"
                onClick={fetchDecks}
                disabled={loading}
                className="rounded-lg border border-zinc-300 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Refresh
              </button>
            </div>
          </form>
        </div>

        {/* Deck list */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-transform hover:scale-[1.02] dark:border-zinc-700 dark:bg-zinc-900"
            >
              {/* Image placeholder */}
              <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
                {deck.images[0] ? (
                  <img
                    src={deck.images[0].url}
                    alt={deck.images[0].altText || deck.name}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-4xl">🃏</span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {deck.name}
              </h3>

              {/* Description */}
              {deck.description && (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {deck.description}
                </p>
              )}

              {/* Price */}
              {deck.prices[0] && (
                <div className="mt-2 text-lg font-bold text-green-600 dark:text-green-400">
                  {deck.prices[0].amount} {deck.prices[0].currency}
                </div>
              )}

              {/* Date */}
              <p className="mt-auto pt-3 text-xs text-zinc-400">
                Created on{" "}
                {new Date(deck.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>
          ))}

          {decks.length === 0 && !loading && (
            <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
              No decks. Create one!
            </div>
          )}

          {loading && decks.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
