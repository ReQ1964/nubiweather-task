import { z } from 'zod';

export const TodayHighlightSchema = z.object({
  name: z.string(),
  timestamp: z.string(),
  humidity: z.number(),
  uv: z.number(),
  vis_km: z.number(),
  wind_kph: z.number(),
  precip_mm: z.number(),
  heatindex_c: z.number(),
});

export const CurrentWeatherSchema = z.object({
  name: z.string(),
  country: z.string(),
  localtime: z.string(),
  timestamp: z.string(),
  temp_c: z.number(),

  condition: z.string(),
  icon: z.string(),
});

export const ForecastSchema = z.object({
  name: z.string(),
  localtime: z.string(),
  timestamp: z.string(),
  dayForecasts: z.array(
    z.object({
      date: z.string(),
      avgtemp_c: z.number(),
      condition: z.string(),
      icon: z.string(),
      hourForecasts: z.array(
        z.object({
          hour: z.string(),
          temp_c: z.number(),
          condition: z.string(),
          icon: z.string(),
        }),
      ),
    }),
  ),
});

export const WeekForecastSchema = z.object({
  name: z.string(),
  localtime: z.string(),
  timestamp: z.string(),
  dayForecasts: z.array(
    z.object({
      date: z.string(),
      avgtemp_c: z.number(),
      condition: z.string(),
      icon: z.string(),
    }),
  ),
});
