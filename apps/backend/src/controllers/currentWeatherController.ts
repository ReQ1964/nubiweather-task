import { Request, Response } from 'express';
import axios from 'axios';
import { CurrentWeatherResult } from '../../schema/currentWeatherSchema';
import dayjs from 'dayjs';

import { prisma } from '../prismaClient';

const flattenCurrentWeatherObject = (parsedData: any) => {
  const finalObj: any = {};

  const flatten = (obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        flatten(value);
      } else {
        finalObj[key === 'text' ? 'condition' : key] = value;
      }
    }
  };

  flatten(parsedData);
  return finalObj;
};

const compareTime = (inputTime: string): boolean => {
  const parsedTime = dayjs(inputTime);
  const currentTime = dayjs();

  return currentTime.isAfter(parsedTime.add(30, 'minute'));
};

export const getCurrentWeather = async (req: Request, res: Response) => {
  const wData = await prisma.weatherData.findFirst();

  if (wData) {
    const isTimeOutdated = compareTime(wData.localtime.toString());

    if (!isTimeOutdated) {
      res.json(wData);
      return;
    }
  }

  const { city } = req.query;
  const { data } = await axios.get(`${process.env.API_URL}/current.json`, {
    params: {
      key: process.env.API_KEY,
      q: city,
      aqi: 'no',
    },
  });

  const parsedData = CurrentWeatherResult.parse(data);
  const flattenedData = flattenCurrentWeatherObject(parsedData);

  await prisma.weatherData.update({ where: { id: 1 }, data: flattenedData });

  res.json(flattenedData);
};
