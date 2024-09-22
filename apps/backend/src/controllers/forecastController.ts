import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';
import {
  UnFlattenedOneDayForecastSchema,
  UnFlattenedOneDayForecastSchemaType,
} from '@/schema/weatherApi';
import {
  OneDayForecastSchema,
  OneDayForecastSchemaType,
} from '@/schema/weatherApi';
import { prisma } from '@/prismaClient';
import dayjs from 'dayjs';

function flattenForecastDays(
  forecastDays: UnFlattenedOneDayForecastSchemaType['forecast']['forecastday'],
): OneDayForecastSchemaType {
  return forecastDays.map((dayForecast) => ({
    date: dayForecast.date,
    timestamp: dayjs().toISOString(),
    hourForecasts: dayForecast.hour.map((hourForecast) => ({
      hour: hourForecast.time.split(' ')[1],
      temp_c: hourForecast.temp_c,
      condition: hourForecast.condition.text,
      icon: hourForecast.condition.icon,
    })),
  }));
}

export const getForecastData = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { city } = req.query;

    const forecastData = await prisma.forecastDay.findMany({
      include: {
        hourForecasts: true,
      },
    });

    const { data } = await axios.get(`${process.env.API_URL}/forecast.json`, {
      params: {
        q: city,
        key: process.env.API_KEY,
        days: 2,
        aqi: 'no',
      },
    });

    const parsedData = UnFlattenedOneDayForecastSchema.parse(data);
    const flattenedData = flattenForecastDays(parsedData.forecast.forecastday);

    const validatedData = OneDayForecastSchema.parse(flattenedData);

    if (!forecastData) {
      await Promise.all(
        validatedData.map(async (forecastDay) => {
          await prisma.forecastDay.create({
            data: {
              date: forecastDay.date,
              timestamp: forecastDay.timestamp,
              hourForecasts: {
                create: forecastDay.hourForecasts.map((hourForecast) => ({
                  hour: hourForecast.hour,
                  temp_c: hourForecast.temp_c,
                  condition: hourForecast.condition,
                  icon: hourForecast.icon,
                })),
              },
            },
          });
        }),
      );
    } else {
      await Promise.all(
        validatedData.map(async (forecastDay, index) => {
          if (forecastData[index]) {
            await prisma.forecastDay.update({
              where: { id: forecastData[index].id },
              data: {
                date: forecastDay.date,
                timestamp: forecastDay.timestamp,
                hourForecasts: {
                  deleteMany: {},
                  create: forecastDay.hourForecasts.map((hourForecast) => ({
                    hour: hourForecast.hour,
                    temp_c: hourForecast.temp_c,
                    condition: hourForecast.condition,
                    icon: hourForecast.icon,
                  })),
                },
              },
            });
          }
        }),
      );
    }

    res.json(validatedData);
  },
);
