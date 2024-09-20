import { Request, Response } from 'express';
import axios from 'axios';
import { FetchTodayOverviewResult } from 'shared-schemas/apiSchemas';
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

export const getCurrentWeather = async (req: Request, res: Response) => {
  const wData = await prisma.weatherData.findFirst();

  const { city } = req.query;
  const { data } = await axios.get(`${process.env.API_URL}/current.json`, {
    params: {
      key: process.env.API_KEY,
      q: city,
      aqi: 'no',
    },
  });

  const parsedData = FetchTodayOverviewResult.parse(data);
  const flattenedData = flattenCurrentWeatherObject(parsedData);
  // await prisma.weatherData.create({ data: flattenedData });

  res.json(flattenCurrentWeatherObject(wData));
};
