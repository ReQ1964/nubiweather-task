import { getTodayHighlight } from '@/controllers/todayHighlightController';
import checkDataExpiry from '@/middlewares/checkDataExpiry';
import { Router } from 'express';

const todayHighlightRouter = Router();

todayHighlightRouter
  .route('/')
  .get(checkDataExpiry('highlightData'), getTodayHighlight);

export default todayHighlightRouter;
