import checkDataExpiry from '@/middlewares/checkDataExpiry';
import { Router } from 'express';

import { getCurrentWeather } from '../controllers/currentWeatherController';

const currentWeatherRouter = Router();

currentWeatherRouter
  .route('/')
  .get(checkDataExpiry('weatherData'), getCurrentWeather);

export default currentWeatherRouter;
