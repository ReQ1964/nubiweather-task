/*
  Warnings:

  - Added the required column `avgtemp_c` to the `DayForecast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `DayForecast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `DayForecast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DayForecast" ADD COLUMN     "avgtemp_c" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;
