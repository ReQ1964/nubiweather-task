import { Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '@/prismaClient';
import { compareTime, flattenTodayData } from '../helpers/controllerHelpers';
import {
  TodayHighlightSchema,
  TodayHiglightSchemaType,
  FlattenedTodayHighlightSchemaType,
  FlattenedTodayHighlightSchema,
} from '../../schema/todayHighlightSchema';

export const getTodayHighlight = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

  const parsedData = TodayHighlightSchema.parse(data);
  const flattenedData = flattenTodayData<
  TodayHiglightSchemaType,
  FlattenedTodayHighlightSchemaType
  >(parsedData);

  const validatedData = FlattenedTodayHighlightSchema.parse(flattenedData);

  if (highlightData) {
    await prisma.highlightData.create({
      data: validatedData,
    });
  } else {
    await prisma.highlightData.update({
      where: { id: 1 },
      data: validatedData,
    });
  }

  res.json(flattenedData);
};
