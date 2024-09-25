import {
  flattenForecastDays,
  isTimeExpired,
} from '@/helpers/controllerHelpers';
import { prisma } from '@/prismaClient';
import { ForecastSchema, UnFlattenedForecastSchema } from '@/schema/weatherApi';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

export const checkForecastDataExpiry = expressAsyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { city } = req.query as { city: string };

    const existingForecast = await prisma.forecastData.findUnique({
      where: { name: city },
      include: {
        dayForecasts: true,
      },
    });

    if (existingForecast) {
      if (!isTimeExpired(existingForecast.localtime)) {
        next();
      }
    }

    const { data } = await axios.get(`${process.env.API_URL}/forecast.json`, {
      params: {
        q: city,
        key: process.env.API_KEY,
        days: 7,
        aqi: 'no',
      },
    });

    const parsedData = UnFlattenedForecastSchema.parse(data);
    const flattenedData = flattenForecastDays(parsedData);
    const validatedData = ForecastSchema.parse(flattenedData);

    if (existingForecast) {
      await prisma.hourForecast.deleteMany({
        where: {
          forecastDayId: {
            in: existingForecast.dayForecasts.map((day) => day.id),
          },
        },
      });

      await prisma.dayForecast.deleteMany({
        where: {
          forecastDataId: existingForecast.id,
        },
      });
    }

    await prisma.forecastData.upsert({
      where: { name: validatedData.name },
      update: {
        localtime: validatedData.localtime,
        dayForecasts: {
          create: validatedData.dayForecasts.map((dayForecast) => ({
            date: dayForecast.date,
            avgtemp_c: dayForecast.avgtemp_c,
            condition: dayForecast.condition,
            icon: dayForecast.icon,
            hourForecasts: {
              create: dayForecast.hourForecasts.map((hourForecast) => ({
                hour: hourForecast.hour,
                temp_c: hourForecast.temp_c,
                condition: hourForecast.condition,
                icon: hourForecast.icon,
              })),
            },
          })),
        },
      },
      create: {
        name: validatedData.name,
        localtime: validatedData.localtime,
        dayForecasts: {
          create: validatedData.dayForecasts.map((dayForecast) => ({
            date: dayForecast.date,
            avgtemp_c: dayForecast.avgtemp_c,
            condition: dayForecast.condition,
            icon: dayForecast.icon,
            hourForecasts: {
              create: dayForecast.hourForecasts.map((hourForecast) => ({
                hour: hourForecast.hour,
                temp_c: hourForecast.temp_c,
                condition: hourForecast.condition,
                icon: hourForecast.icon,
              })),
            },
          })),
        },
      },
    });
    next();
  },
);

export const getWeekForecast = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { city } = req.query as { city: string };
    const forecastData = await prisma.forecastData.findUnique({
      where: { name: city },
      include: {
        dayForecasts: {
          take: 7,
        },
      },
    });
    res.json(forecastData);
  },
);

export const getOneDayForecast = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { city } = req.query as { city: string };
    const forecastData = await prisma.forecastData.findUnique({
      where: { name: city },
      include: {
        dayForecasts: {
          take: 2,
          include: {
            hourForecasts: true,
          },
        },
      },
    });
    res.json(forecastData);
  },
);
