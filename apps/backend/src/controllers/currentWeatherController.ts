import { Request, Response } from 'express';
import axios from 'axios';
import {
  CurrentWeatherSchema,
  CurrentWeatherSchemaType,
  FlattenedCurrentWeatherSchema,
  FlattenedCurrentWeatherSchemaType,
} from '../../schema/currentWeatherSchema';
import { compareTime, flattenTodayData } from '../helpers/controllerHelpers';
import { prisma } from '../prismaClient';

export const getCurrentWeather = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { city } = req.query;
  const weatherData = await prisma.weatherData.findFirst();

  if (weatherData) {
    const isTimeOutdated = compareTime(weatherData.localtime.toString());

    if (!isTimeOutdated && weatherData.name === city) {
      res.json(weatherData);
      return;
    }
  }

  const { data } = await axios.get(`${process.env.API_URL}/current.json`, {
    params: {
      key: process.env.API_KEY,
      q: city,
      aqi: 'no',
    },
  });

  const parsedData = CurrentWeatherSchema.parse(data);
  const flattenedData = flattenTodayData<
  CurrentWeatherSchemaType,
  FlattenedCurrentWeatherSchemaType
  >(parsedData);

  const validatedData = FlattenedCurrentWeatherSchema.parse(flattenedData);

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
};
