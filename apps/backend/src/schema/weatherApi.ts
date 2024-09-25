import { z } from 'zod';

const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

export const UnFlattenedTodayHighlightSchema = z.object({
  location: z.object({
    name: z.string(),
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

export const UnFlattenedCurrentWeatherSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: conditionSchema,
  }),
});

export type UnFlattenedCurrentWeatherSchemaType = z.infer<
  typeof UnFlattenedCurrentWeatherSchema
>;

export const UnFlattenedForecastSchema = z.object({
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

export type UnFlattenedForecastSchemaType = z.infer<
  typeof UnFlattenedForecastSchema
>;
