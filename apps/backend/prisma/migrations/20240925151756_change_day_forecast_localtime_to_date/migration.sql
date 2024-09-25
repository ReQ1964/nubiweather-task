/*
  Warnings:

  - You are about to drop the column `localtime` on the `DayForecast` table. All the data in the column will be lost.
  - Added the required column `date` to the `DayForecast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DayForecast" DROP COLUMN "localtime",
ADD COLUMN     "date" TEXT NOT NULL;
