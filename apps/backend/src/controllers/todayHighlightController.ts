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

import { flattenTodayData } from '../helpers/controllerHelpers';

export const getTodayHighlight = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { city } = req.query;

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

    const updatedHighlightData = await prisma.highlightData.upsert({
      where: { name: city as string },
      update: validatedData,
      create: validatedData,
    });

    res.json(updatedHighlightData);
  },
);

// Fetch 7 days and set to db, with 30min timeout, endpoint fetches the number of given days
