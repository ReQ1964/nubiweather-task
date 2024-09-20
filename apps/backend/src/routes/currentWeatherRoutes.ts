import { Router } from 'express';
import { getCurrentWeather } from '../controllers/currentWeatherController';

const currentWeatherRouter = Router();

currentWeatherRouter.route('/').get(getCurrentWeather);

export default currentWeatherRouter;
