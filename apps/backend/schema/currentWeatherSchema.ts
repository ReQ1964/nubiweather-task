import { z } from 'zod';

const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export const CurrentWeatherSchema = z.object({
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

export type CurrentWeatherSchemaType = z.infer<typeof CurrentWeatherSchema>;

export const FlattenedCurrentWeatherSchema = z.object({
  name: z.string(),
  country: z.string(),
  localtime: z.string().transform((val) => new Date(val).toISOString()),
  temp_c: z.number(),

  condition: z.string(),
  icon: z.string(),
});

export type FlattenedCurrentWeatherSchemaType = z.infer<
  typeof FlattenedCurrentWeatherSchema
>;
