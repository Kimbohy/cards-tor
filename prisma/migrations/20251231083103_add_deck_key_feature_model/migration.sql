-- CreateTable
CREATE TABLE "KeyFeature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeckKeyFeature" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "keyFeatureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeckKeyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeckKeyFeature_deckId_keyFeatureId_key" ON "DeckKeyFeature"("deckId", "keyFeatureId");

-- AddForeignKey
ALTER TABLE "DeckKeyFeature" ADD CONSTRAINT "DeckKeyFeature_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeckKeyFeature" ADD CONSTRAINT "DeckKeyFeature_keyFeatureId_fkey" FOREIGN KEY ("keyFeatureId") REFERENCES "KeyFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
