import {
  CurrentWeatherSchema,
  FetchForecastResult,
  TodayHighlightSchema,
} from 'shared-schemas/apiSchemas';
import { z } from 'zod';

export type ForecastData = z.infer<typeof FetchForecastResult>;

export type TodayHighlightSchemaType = z.infer<typeof TodayHighlightSchema>;

export type CurrentWeatherSchemaType = z.infer<typeof CurrentWeatherSchema>;
