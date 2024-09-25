import {
  CurrentWeatherSchema,
  ForecastSchema,
  TodayHighlightSchema,
  WeekForecastSchema,
} from 'shared-schemas/apiSchemas';
import { z } from 'zod';

export type TodayHighlightSchemaType = z.infer<typeof TodayHighlightSchema>;

export type CurrentWeatherSchemaType = z.infer<typeof CurrentWeatherSchema>;

export type ForecastSchemaType = z.infer<typeof ForecastSchema>;

export type WeekForecastSchemaType = z.infer<typeof WeekForecastSchema>;
