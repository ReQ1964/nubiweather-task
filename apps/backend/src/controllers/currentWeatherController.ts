import {
  UnFlattenedCurrentWeatherSchema,
  UnFlattenedCurrentWeatherSchemaType,
} from '@/schema/weatherApi';
import axios from 'axios';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { CurrentWeatherSchemaType } from 'shared-types/apiTypes';

import { flattenTodayData } from '../helpers/controllerHelpers';
import { prisma } from '../prismaClient';

export const getCurrentWeather = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { city } = req.query;

    const { data } = await axios.get(`${process.env.API_URL}/current.json`, {
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

    const updatedWeatherData = await prisma.weatherData.upsert({
      where: { name: city as string },
      update: validatedData,
      create: validatedData,
    });

    res.json(updatedWeatherData);
  },
);
