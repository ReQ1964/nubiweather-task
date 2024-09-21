import { z } from 'zod';

export const UnFlattenedTodayHighlightSchema = z.object({
  location: z.object({
    localtime: z.string().transform((val) => new Date(val).toISOString()),
  }),
  current: z.object({
    humidity: z.number(),
    uv: z.number(),
    vis_km: z.number(),
    wind_kph: z.number(),
    precip_mm: z.number(),
    heatindex_c: z.number(),
  }),
});

export type UnFlattenedTodayHighlightSchemaType = z.infer<
  typeof UnFlattenedTodayHighlightSchema
>;

const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export const UnFlattenedCurrentWeatherSchema = z.object({
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

export type UnFlattenedCurrentWeatherSchemaType = z.infer<
  typeof UnFlattenedCurrentWeatherSchema
>;
