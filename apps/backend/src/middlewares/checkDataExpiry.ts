/* eslint-disable @typescript-eslint/no-explicit-any */
import { isTimeExpired } from '@/helpers/controllerHelpers';
import { prisma } from '@/prismaClient';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const checkDataExpiry = (modelName: string): RequestHandler => {
  return expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { city } = req.query;
      const latestDbData = await (
        prisma[modelName as keyof typeof prisma] as any
      ).findFirst({
        where: { name: city as string },
      });

      if (latestDbData && !isTimeExpired(latestDbData.timestamp.toString())) {
        res.json(latestDbData);
      } else {
        return next();
      }
    },
  );
};

export default checkDataExpiry;
