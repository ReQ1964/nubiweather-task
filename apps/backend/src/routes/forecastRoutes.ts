import { Router } from 'express';

const forecastRouter = Router();

forecastRouter.route('/').get();

export default forecastRouter;
