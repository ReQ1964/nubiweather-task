import { z } from 'zod';
import {
  FetchForecastResult,
  FetchTodayOverviewResult,
  TodayHighlightSchema,
  CurrentWeatherSchema,
} from 'shared-schemas/apiSchemas';

export type CityName = z.infer<
  typeof FetchTodayOverviewResult
>['location']['name'];
export type WeatherData = z.infer<typeof FetchTodayOverviewResult>;

export type ForecastData = z.infer<typeof FetchForecastResult>;

export type TodayHighlightSchemaType = z.infer<typeof TodayHighlightSchema>;

export type CurrentWeatherSchemaType = z.infer<typeof CurrentWeatherSchema>;
