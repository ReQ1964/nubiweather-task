import { Request, Response } from 'express';
import axios from 'axios';
import {
  UnFlattenedCurrentWeatherSchema,
  UnFlattenedCurrentWeatherSchemaType,
} from '@/schema/weatherApi';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { CurrentWeatherSchemaType } from 'shared-types/apiTypes';
import { compareTime, flattenTodayData } from '../helpers/controllerHelpers';
import { prisma } from '../prismaClient';
import expressAsyncHandler from 'express-async-handler';

export const getCurrentWeather = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { city } = req.query;
    const weatherData = await prisma.weatherData.findFirst();

    if (weatherData) {
      const isTimeOutdated = compareTime(weatherData.localtime.toString());

      if (!isTimeOutdated && weatherData.name === city) {
        res.json(weatherData);
        return;
      }
    }

    const { data } = await axios.get(`${process.env.API_URL}/curarent.json`, {
      params: {
        key: process.env.API_KEY,
        q: city,
        aqi: 'no',
      },
    });

    const parsedData = UnFlattenedCurrentWeatherSchema.parse(data);
    const flattenedData = flattenTodayData<
      UnFlattenedCurrentWeatherSchemaType,
      CurrentWeatherSchemaType
    >(parsedData);

    const validatedData = CurrentWeatherSchema.parse(flattenedData);

    if (!weatherData as boolean) {
      await prisma.weatherData.create({
        data: validatedData,
      });
    } else {
      await prisma.weatherData.update({
        where: { id: 1 },
        data: validatedData,
      });
    }

    res.json(validatedData);
  },
);
