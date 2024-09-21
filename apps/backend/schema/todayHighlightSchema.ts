import { z } from 'zod';

export const TodayHighlightSchema = z.object({
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

export type TodayHiglightSchemaType = z.infer<typeof TodayHighlightSchema>;

export const FlattenedTodayHighlightSchema = z.object({
  localtime: z.string().transform((val) => new Date(val).toISOString()),
  humidity: z.number(),
  uv: z.number(),
  vis_km: z.number(),
  wind_kph: z.number(),
  precip_mm: z.number(),
  heatindex_c: z.number(),
});

export type FlattenedTodayHighlightSchemaType = z.infer<
  typeof FlattenedTodayHighlightSchema
>;
