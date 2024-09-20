import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { FetchTodayOverviewResult } from 'shared-schemas/apiSchemas';
import { prisma } from '../prismaClient';

const flattenOverviewObject = (parsedData: any) => {
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

export const checkForQueryErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { city } = req.query;
  !city ? next(new Error('City query parameter is required!')) : next();
};

export const getTodayOverview = async (req: Request, res: Response) => {
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
  const flattenedData = flattenOverviewObject(parsedData);
  // await prisma.weatherData.create({ data: flattenedData });

  res.json(flattenOverviewObject(wData));
};
