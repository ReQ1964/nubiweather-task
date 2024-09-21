-- CreateTable
CREATE TABLE "WeatherData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "localtime" TIMESTAMP(3) NOT NULL,
    "temp_c" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "uv" DOUBLE PRECISION NOT NULL,
    "vis_km" DOUBLE PRECISION NOT NULL,
    "wind_kph" DOUBLE PRECISION NOT NULL,
    "precip_mm" DOUBLE PRECISION NOT NULL,
    "heatindex_c" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);
