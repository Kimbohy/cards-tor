import { api } from "@/lib/eden-server";
import { describe, expect, it } from "bun:test";
import { setupTestDatabase, testData } from "./setup";

describe("Deck", () => {
  // Configure automatic DB cleanup (runs beforeAll, afterEach, afterAll)
  setupTestDatabase();

  it("create a new deck", async () => {
    const newDeck = testData.createDeckInput({
      images: [
        {
          url: "http://example.com/image1.png",
          altText: "Front view",
        },
        {
          url: "http://example.com/image2.png",
        },
      ],
    });

    const { data, status } = await api.deck.post(newDeck);
    expect(status).toBe(201);
    expect(data?.success).toBe(true);
    expect(data?.data.name).toBe(newDeck.name);
  });

  it("get all decks", async () => {
    // First, create a deck to ensure there is data
    const newDeck = testData.createDeckInput();
    await api.deck.post(newDeck);

    // Now, retrieve all decks
    const { data, status } = await api.deck.get();
    // console.log(data);
    expect(status).toBe(200);
    expect(data?.success).toBe(true);
    expect(Array.isArray(data?.data)).toBe(true);
    expect(data?.data[0].name).toBe(newDeck.name);
  });

  it("returns empty array when no decks exist", async () => {
    const { data, status } = await api.deck.get();
    expect(status).toBe(200);
    expect(data?.data).toHaveLength(0);
  });

  it("returns created deck in list", async () => {
    // Create a deck
    const newDeck = testData.createDeckInput({ name: "Unique Test Deck" });
    await api.deck.post(newDeck);

    // Verify it appears in the list
    const { data } = await api.deck.get();
    expect(data?.data).toHaveLength(1);
    expect(data?.data[0].name).toBe("Unique Test Deck");
  });
});
