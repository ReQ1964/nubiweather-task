import { NextFunction, Request, Response } from 'express';

export const checkForQueryErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { cityParam } = req.query;
  !cityParam ? next(new Error('City query parameter is required!')) : next();
};

export const getTodayOverview = (req: Request, res: Response) => {
  const { cityParam } = req.query;
  res.json(cityParam);
};
