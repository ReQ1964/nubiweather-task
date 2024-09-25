/*
  Warnings:

  - Added the required column `name` to the `HighlightData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HighlightData" ADD COLUMN     "name" TEXT NOT NULL;
