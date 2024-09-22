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

export const UnFlattenedOneDayForecastSchema = z.object({
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
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

export type UnFlattenedOneDayForecastSchemaType = z.infer<
  typeof UnFlattenedOneDayForecastSchema
>;

export const OneDayForecastSchema = z.array(
  z.object({
    date: z.string(),
    timestamp: z.string().transform((val) => new Date(val).toISOString()),
    hourForecasts: z.array(
      z.object({
        hour: z.string(),
        temp_c: z.number(),
        condition: z.string(),
        icon: z.string(),
      }),
    ),
  }),
);

export type OneDayForecastSchemaType = z.infer<typeof OneDayForecastSchema>;

export const UnFlattenedWeekForecastSchema = z.object({
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
        day: z.object({
          avgtemp_c: z.number(),
          condition: conditionSchema,
        }),
      }),
    ),
  }),
});

export type UnFlattenedWeekForecastSchemaType = z.infer<
  typeof UnFlattenedOneDayForecastSchema
>;
