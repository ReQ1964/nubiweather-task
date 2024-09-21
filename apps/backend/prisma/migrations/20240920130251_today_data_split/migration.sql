/*
  Warnings:

  - You are about to drop the column `heatindex_c` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to drop the column `precip_mm` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to drop the column `uv` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to drop the column `vis_km` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to drop the column `wind_kph` on the `WeatherData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeatherData" DROP COLUMN "heatindex_c",
DROP COLUMN "precip_mm",
DROP COLUMN "uv",
DROP COLUMN "vis_km",
DROP COLUMN "wind_kph";

-- CreateTable
CREATE TABLE "HighlightData" (
    "id" SERIAL NOT NULL,
    "uv" DOUBLE PRECISION NOT NULL,
    "vis_km" DOUBLE PRECISION NOT NULL,
    "wind_kph" DOUBLE PRECISION NOT NULL,
    "precip_mm" DOUBLE PRECISION NOT NULL,
    "heatindex_c" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HighlightData_pkey" PRIMARY KEY ("id")
);
