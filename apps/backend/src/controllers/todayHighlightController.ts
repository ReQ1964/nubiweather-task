import { prisma } from '@/prismaClient';
import {
  UnFlattenedTodayHighlightSchema,
  UnFlattenedTodayHighlightSchemaType,
} from '@/schema/weatherApi';
import axios from 'axios';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { TodayHighlightSchema } from 'shared-schemas/apiSchemas';
import { TodayHighlightSchemaType } from 'shared-types/apiTypes';

import { compareTime, flattenTodayData } from '../helpers/controllerHelpers';

export const getTodayHighlight = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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

    const parsedData = UnFlattenedTodayHighlightSchema.parse(data);
    const flattenedData = flattenTodayData<
      UnFlattenedTodayHighlightSchemaType,
      TodayHighlightSchemaType
    >(parsedData);

    const validatedData = TodayHighlightSchema.parse(flattenedData);

    if (!highlightData) {
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
  },
);
