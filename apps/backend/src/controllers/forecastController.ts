import {
  flattenForecastDays,
  isTimeExpired,
} from '@/helpers/controllerHelpers';
import { prisma } from '@/prismaClient';
import { UnFlattenedForecastSchema } from '@/schema/weatherApi';
import axios from 'axios';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ForecastSchema } from 'shared-schemas/apiSchemas';
import { ForecastSchemaType } from 'shared-types/apiTypes';

const deleteExistingForecasts = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingForecast: any,
): Promise<void> => {
  const dayIdsToDelete = existingForecast.dayForecasts.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (day: any) => day.id,
  );

  await prisma.hourForecast.deleteMany({
    where: {
      forecastDayId: {
        in: dayIdsToDelete,
      },
    },
  });

  await prisma.dayForecast.deleteMany({
    where: {
      forecastDataId: existingForecast.id,
    },
  });
};

const upsertForecastData = async (
  validatedData: ForecastSchemaType,
): Promise<void> => {
  const forecastCreateUpdatePayload = {
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
  };

  await prisma.forecastData.upsert({
    where: { name: validatedData.name },
    update: forecastCreateUpdatePayload,
    create: {
      name: validatedData.name,
      localtime: validatedData.localtime,
      timestamp: validatedData.timestamp,
      ...forecastCreateUpdatePayload,
    },
  });
};

export const checkForecastDataExpiry = expressAsyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { city } = req.query as { city: string };

    const existingForecast = await prisma.forecastData.findUnique({
      where: { name: city },
      include: { dayForecasts: true },
    });

    if (existingForecast && !isTimeExpired(existingForecast.timestamp)) {
      return next();
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

    const currentTimestamp = dayjs().toISOString();
    const validatedData = ForecastSchema.parse({
      ...flattenedData,
      timestamp: currentTimestamp,
    });

    if (existingForecast) {
      await deleteExistingForecasts(existingForecast);
    }

    await upsertForecastData(validatedData);
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
