import { z } from 'zod';

const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export const FetchForecastResult = z.object({
  location: z.object({
    name: z.string(),
    localtime: z.string(),
  }),
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
        day: z.object({
          avgtemp_c: z.number(),
          condition: conditionSchema,
        }),
        hour: z.array(
          z.object({
            time: z.string(),
            temp_c: z.number(),
            condition: conditionSchema,
          }),
        ),
      }),
    ),
  }),
});

export const TodayHighlightSchema = z.object({
  name: z.string(),
  localtime: z.string(),
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
  temp_c: z.number(),

  condition: z.string(),
  icon: z.string(),
});
