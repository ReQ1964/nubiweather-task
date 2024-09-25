/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `HighlightData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `WeatherData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HighlightData_name_key" ON "HighlightData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_name_key" ON "WeatherData"("name");
