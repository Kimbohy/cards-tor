/*
  Warnings:

  - The primary key for the `DeckKeyFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[deckId,keyFeatureId]` on the table `DeckKeyFeature` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `DeckKeyFeature` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "DeckKeyFeature" DROP CONSTRAINT "DeckKeyFeature_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DeckKeyFeature_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeckKeyFeature_deckId_keyFeatureId_key" ON "DeckKeyFeature"("deckId", "keyFeatureId");
