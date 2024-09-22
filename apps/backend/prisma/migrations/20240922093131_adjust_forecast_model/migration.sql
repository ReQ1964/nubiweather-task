/*
  Warnings:

  - You are about to drop the column `date` on the `ForecastDay` table. All the data in the column will be lost.
  - Added the required column `date` to the `Forecast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forecast" ADD COLUMN     "date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForecastDay" DROP COLUMN "date";
