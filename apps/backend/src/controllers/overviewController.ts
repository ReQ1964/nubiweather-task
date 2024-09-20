import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export const checkForQueryErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { city } = req.query;
  !city ? next(new Error('City query parameter is required!')) : next();
};

export const getTodayOverview = async (req: Request, res: Response) => {
  const { city } = req.query;
  const { data } = await axios.get(`${process.env.API_URL}/current.json`, {
    params: {
      key: process.env.API_KEY,
      q: city,
      aqi: 'no',
    },
  });

  console.log(data);
  res.json(data);
};
