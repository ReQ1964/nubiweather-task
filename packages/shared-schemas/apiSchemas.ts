import { z } from 'zod';

export const FetchTodayForecastResult = z.object({
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
