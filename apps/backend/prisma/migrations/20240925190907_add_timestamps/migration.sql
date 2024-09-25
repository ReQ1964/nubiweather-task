/*
  Warnings:

  - You are about to drop the column `localtime` on the `ForecastData` table. All the data in the column will be lost.
  - You are about to drop the column `localtime` on the `HighlightData` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `ForecastData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `HighlightData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForecastData" DROP COLUMN "localtime",
ADD COLUMN     "timestamp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HighlightData" DROP COLUMN "localtime",
ADD COLUMN     "timestamp" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WeatherData" ADD COLUMN     "timestamp" TEXT NOT NULL;
