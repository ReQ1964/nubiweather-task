import { z } from 'zod';

const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export const CurrentWeatherResult = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    localtime: z.string().transform((val) => new Date(val).toISOString()),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: conditionSchema,
  }),
});
