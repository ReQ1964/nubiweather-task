import { Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '@/prismaClient';
import { compareTime, flattenTodayData } from '../helpers/controllerHelpers';
import { TodayHighlightResult } from '../../schema/todayHighlightSchema';

export const getTodayHighlight = async (req: Request, res: Response) => {
  const { city } = req.query;

  const highlightData = await prisma.highlightData.findFirst();

  if (highlightData) {
    const isTimeOutdated = compareTime(highlightData.localtime.toString());

    if (!isTimeOutdated) {
      res.json(highlightData);
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

  const parsedData = TodayHighlightResult.parse(data);
  const flattenedData = flattenTodayData(parsedData);

  const isHighlightDataInDB = await prisma.highlightData.findFirst();

  if (!isHighlightDataInDB as boolean) {
    await prisma.highlightData.create({
      data: flattenedData,
    });
  } else {
    await prisma.highlightData.update({
      where: { id: 1 },
      data: flattenedData,
    });
  }

  res.json(flattenedData);
};
