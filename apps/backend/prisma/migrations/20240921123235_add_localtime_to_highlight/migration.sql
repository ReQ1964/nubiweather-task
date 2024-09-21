/*
  Warnings:

  - Added the required column `localtime` to the `HighlightData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HighlightData" ADD COLUMN     "localtime" TIMESTAMP(3) NOT NULL;
