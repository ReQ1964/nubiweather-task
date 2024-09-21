import { Request, Response } from 'express';
import axios from 'axios';
import { CurrentWeatherResult } from '../../schema/currentWeatherSchema';
import { compareTime, flattenTodayData } from '../helpers/controllerHelpers';
import { prisma } from '../prismaClient';

export const getCurrentWeather = async (req: Request, res: Response) => {
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

  const parsedData = CurrentWeatherResult.parse(data);
  const flattenedData = flattenTodayData(parsedData);

  const isWeatherDataInDB = await prisma.weatherData.findFirst();

  if (!isWeatherDataInDB as boolean) {
    await prisma.weatherData.create({
      data: flattenedData,
    });
  } else {
    await prisma.weatherData.update({
      where: { id: 1 },
      data: flattenedData,
    });
  }

  res.json(flattenedData);
};
