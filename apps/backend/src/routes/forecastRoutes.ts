import {
  checkForecastDataExpiry,
  getOneDayForecast,
  getWeekForecast,
} from '@/controllers/forecastController';
import { Router } from 'express';

const forecastRouter = Router();

forecastRouter.route('/week').get(checkForecastDataExpiry, getWeekForecast);

forecastRouter.route('/oneDay').get(checkForecastDataExpiry, getOneDayForecast);

export default forecastRouter;
