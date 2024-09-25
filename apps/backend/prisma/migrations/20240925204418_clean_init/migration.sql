-- CreateTable
CREATE TABLE "WeatherData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "localtime" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "temp_c" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighlightData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "uv" DOUBLE PRECISION NOT NULL,
    "vis_km" DOUBLE PRECISION NOT NULL,
    "wind_kph" DOUBLE PRECISION NOT NULL,
    "precip_mm" DOUBLE PRECISION NOT NULL,
    "heatindex_c" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HighlightData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForecastData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "localtime" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "ForecastData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayForecast" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "avgtemp_c" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "forecastDataId" INTEGER,

    CONSTRAINT "DayForecast_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_name_key" ON "WeatherData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HighlightData_name_key" ON "HighlightData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ForecastData_name_key" ON "ForecastData"("name");

-- AddForeignKey
ALTER TABLE "DayForecast" ADD CONSTRAINT "DayForecast_forecastDataId_fkey" FOREIGN KEY ("forecastDataId") REFERENCES "ForecastData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HourForecast" ADD CONSTRAINT "HourForecast_forecastDayId_fkey" FOREIGN KEY ("forecastDayId") REFERENCES "DayForecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
