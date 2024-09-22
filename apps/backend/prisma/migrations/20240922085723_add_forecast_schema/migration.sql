-- CreateTable
CREATE TABLE "Forecast" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForecastDay" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "temp_c" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "forecastId" INTEGER NOT NULL,

    CONSTRAINT "ForecastDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForecastDay" ADD CONSTRAINT "ForecastDay_forecastId_fkey" FOREIGN KEY ("forecastId") REFERENCES "Forecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
