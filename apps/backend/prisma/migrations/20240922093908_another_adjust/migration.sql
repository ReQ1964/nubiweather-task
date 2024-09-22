/*
  Warnings:

  - You are about to drop the `ForecastHour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForecastHour" DROP CONSTRAINT "ForecastHour_forecastId_fkey";

-- DropTable
DROP TABLE "ForecastHour";

-- CreateTable
CREATE TABLE "HourForecast" (
    "id" SERIAL NOT NULL,
    "hour" TEXT NOT NULL,
    "temp_c" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "forecastDayId" INTEGER NOT NULL,

    CONSTRAINT "HourForecast_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HourForecast" ADD CONSTRAINT "HourForecast_forecastDayId_fkey" FOREIGN KEY ("forecastDayId") REFERENCES "ForecastDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
