/*
  Warnings:

  - You are about to drop the column `condition` on the `ForecastDay` table. All the data in the column will be lost.
  - You are about to drop the column `forecastId` on the `ForecastDay` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `ForecastDay` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `ForecastDay` table. All the data in the column will be lost.
  - You are about to drop the column `temp_c` on the `ForecastDay` table. All the data in the column will be lost.
  - You are about to drop the `Forecast` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `ForecastDay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ForecastDay" DROP CONSTRAINT "ForecastDay_forecastId_fkey";

-- AlterTable
ALTER TABLE "ForecastDay" DROP COLUMN "condition",
DROP COLUMN "forecastId",
DROP COLUMN "hour",
DROP COLUMN "icon",
DROP COLUMN "temp_c",
ADD COLUMN     "date" TEXT NOT NULL;

-- DropTable
DROP TABLE "Forecast";

-- CreateTable
CREATE TABLE "ForecastHour" (
    "id" SERIAL NOT NULL,
    "hour" TEXT NOT NULL,
    "temp_c" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "forecastId" INTEGER NOT NULL,

    CONSTRAINT "ForecastHour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForecastHour" ADD CONSTRAINT "ForecastHour_forecastId_fkey" FOREIGN KEY ("forecastId") REFERENCES "ForecastDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
