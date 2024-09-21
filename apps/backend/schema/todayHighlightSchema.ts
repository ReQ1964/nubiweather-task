import { z } from 'zod';

export const TodayHighlightResult = z.object({
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
