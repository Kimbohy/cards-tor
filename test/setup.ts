import { prisma } from "@/lib/prisma";
import { afterAll, afterEach, beforeAll } from "bun:test";

/**
 * Test configuration to isolate the database
 *
 * IMPORTANT: Use a separate test database!
 * Create a .env.test file with DATABASE_URL pointing to your test DB
 *
 * Run tests with: DATABASE_URL="postgresql://..." bun test
 * Or use: bun test --env-file .env.test
 */

// Verify we're in a test environment
const isTestDatabase = () => {
  const dbUrl = process.env.DATABASE_URL || "";
  return dbUrl.includes("test") || process.env.NODE_ENV === "test";
};

/**
 * Clean all database tables
 * Order is important to respect foreign key constraints
 */
export async function cleanDatabase() {
  // Delete in reverse order of dependencies
  await prisma.keyFeature.deleteMany();
  await prisma.price.deleteMany();
  await prisma.image.deleteMany();
  await prisma.deck.deleteMany();
}

/**
 * Global setup for tests
 */
export function setupTestDatabase() {
  beforeAll(async () => {
    // Warning if not using a test DB
    if (!isTestDatabase()) {
      console.warn("\n⚠️  WARNING: You may not be using a test database!");
      console.warn("   Make sure DATABASE_URL points to a test DB.\n");
      throw new Error("Tests aborted: Not using a test database.");
    }

    // Clean DB at test startup
    await cleanDatabase();
  });

  afterEach(async () => {
    // Clean after each test for isolation
    await cleanDatabase();
  });

  afterAll(async () => {
    // Clean disconnection
    await prisma.$disconnect();
  });
}

/**
 * Helpers to create test data
 */
export const testData = {
  createDeckInput: (overrides = {}) => ({
    name: "Test Deck",
    description: "This is a test deck",
    prices: [
      {
        amount: 9.99,
        currency: "USD",
      },
    ],
    keyFeatures: [
      {
        title: "High Durability",
        detail: "Really durable deck for long-term use",
        type: "DURABILITY" as const,
      },
    ],
    images: [
      {
        url: "http://example.com/image1.png",
        altText: "Front view",
      },
    ],
    ...overrides,
  }),
};
