import { NextFunction, Request, Response } from 'express';

import ErrorResponse from '../interfaces/ErrorResponse';

export const checkForCityParameter = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { city } = req.query;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  !city ? next(new Error('City query parameter is required!')) : next();
};

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
): void => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
