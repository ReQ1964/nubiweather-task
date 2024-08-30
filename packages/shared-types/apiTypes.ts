import { z } from 'zod';
import {
  FetchForecastResult,
  FetchTodayOverviewResult,
} from 'shared-schemas/apiSchemas';

export type CityName = z.infer<
  typeof FetchTodayOverviewResult
>['location']['name'];
export type WeatherData = z.infer<typeof FetchTodayOverviewResult>;

export type ForecastData = z.infer<typeof FetchForecastResult>;
