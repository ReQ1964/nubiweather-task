import { z } from 'zod';
import { FetchTodayForecastResult } from 'shared-schemas/apiSchemas';

export type CityName = z.infer<
  typeof FetchTodayForecastResult
>['location']['name'];
export type WeatherData = z.infer<typeof FetchTodayForecastResult>;
