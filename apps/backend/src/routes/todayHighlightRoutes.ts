import { Router } from 'express';

const todayHighlightRouter = Router();

todayHighlightRouter.route('/').get();

export default todayHighlightRouter;
