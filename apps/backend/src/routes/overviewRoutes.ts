import { Router } from 'express';
import {
  getTodayOverview,
  checkForQueryErrors,
} from '../controllers/overviewController';

const overviewRouter = Router();

overviewRouter.route('/').get(checkForQueryErrors, getTodayOverview);

export default overviewRouter;
