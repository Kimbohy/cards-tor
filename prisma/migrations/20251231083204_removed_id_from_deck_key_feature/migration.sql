/*
  Warnings:

  - The primary key for the `DeckKeyFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DeckKeyFeature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeckKeyFeature" DROP CONSTRAINT "DeckKeyFeature_pkey",
DROP COLUMN "id";
