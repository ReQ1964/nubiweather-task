import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import * as middlewares from './middlewares/errorCheckers';

import currentWeatherRouter from './routes/currentWeatherRoutes';
import todayHighlightRouter from './routes/todayHighlightRoutes';
import forecastRouter from './routes/forecastRoutes';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(middlewares.checkForCityParameter);

app.use('/currentWeather', currentWeatherRouter);
app.use('/todayHighlight', todayHighlightRouter);
app.use('/forecast', forecastRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
