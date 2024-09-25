/*
  Warnings:

  - You are about to drop the `ForecastDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HourForecast" DROP CONSTRAINT "HourForecast_forecastDayId_fkey";

-- DropTable
DROP TABLE "ForecastDay";

-- CreateTable
CREATE TABLE "ForecastData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "localtime" TEXT NOT NULL,

    CONSTRAINT "ForecastData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayForecast" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "localtime" TEXT NOT NULL,
    "forecastDataId" INTEGER,

    CONSTRAINT "DayForecast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForecastData_name_key" ON "ForecastData"("name");

-- AddForeignKey
ALTER TABLE "DayForecast" ADD CONSTRAINT "DayForecast_forecastDataId_fkey" FOREIGN KEY ("forecastDataId") REFERENCES "ForecastData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HourForecast" ADD CONSTRAINT "HourForecast_forecastDayId_fkey" FOREIGN KEY ("forecastDayId") REFERENCES "DayForecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
