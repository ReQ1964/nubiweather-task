import { z } from 'zod';

export const FetchTodayOverviewResult = z.object({
  location: z.object({
    name: z.enum(['Gliwice', 'Hamburg']),
    country: z.string(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
    }),
  }),
});

export const FetchForecastResult = z.object({
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
        day: z.object({
          avgtemp_c: z.number(),
          condition: z.object({
            text: z.string(),
            icon: z.string(),
          }),
        }),
      })
    ),
  }),
});
