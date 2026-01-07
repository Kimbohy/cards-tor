/*
  Warnings:

  - You are about to drop the `DeckKeyFeature` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deckId` to the `KeyFeature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeckKeyFeature" DROP CONSTRAINT "DeckKeyFeature_deckId_fkey";

-- DropForeignKey
ALTER TABLE "DeckKeyFeature" DROP CONSTRAINT "DeckKeyFeature_keyFeatureId_fkey";

-- AlterTable
ALTER TABLE "KeyFeature" ADD COLUMN     "deckId" TEXT NOT NULL;

-- DropTable
DROP TABLE "DeckKeyFeature";

-- AddForeignKey
ALTER TABLE "KeyFeature" ADD CONSTRAINT "KeyFeature_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
