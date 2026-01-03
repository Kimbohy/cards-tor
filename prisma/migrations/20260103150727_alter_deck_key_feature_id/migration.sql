-- AlterTable
ALTER TABLE "DeckKeyFeature" ADD CONSTRAINT "DeckKeyFeature_pkey" PRIMARY KEY ("deckId", "keyFeatureId");

-- DropIndex
DROP INDEX "DeckKeyFeature_deckId_keyFeatureId_key";
