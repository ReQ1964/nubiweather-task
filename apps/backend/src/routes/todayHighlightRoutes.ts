import { Router } from 'express';
import { getTodayHighlight } from '@/controllers/todayHighlightController';

const todayHighlightRouter = Router();

todayHighlightRouter.route('/').get(getTodayHighlight);

export default todayHighlightRouter;
