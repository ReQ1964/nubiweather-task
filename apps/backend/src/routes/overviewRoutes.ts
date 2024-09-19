import { Router } from 'express';

const overviewRouter = Router();

overviewRouter.get('/', (req, res) => {
  const { city } = req.query;
  if (!city) {
    res.status(404);
    const error = new Error('City query parameter is required!');
    res.json({
      message: error.message,
      stack: error.stack,
    });
  }
  res.json(city);
});

export default overviewRouter;
