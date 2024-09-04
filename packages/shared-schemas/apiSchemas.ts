import { z } from 'zod';

const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export const FetchTodayOverviewResult = z.object({
  location: z.object({
    name: z.enum(['Gliwice', 'Hamburg']),
    country: z.string(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: conditionSchema,
    humidity: z.number(),
    uv: z.number(),
    vis_km: z.number(),
    wind_kph: z.number(),
    precip_mm: z.number(),
    heatindex_c: z.number(),
  }),
});

export const FetchForecastResult = z.object({
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
          })
        ),
      })
    ),
  }),
});
