import { API_URL } from '@/constants/api';
import { mockWeekForecastData } from '@/libs/vitest/mocks/handlers';
import { server } from '@/libs/vitest/mocks/server';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import WeekForecast from './WeekForecast';

describe('WeekForecast', () => {
  it('should display correct mocked data (without the 1st day)', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeekForecast />
      </QueryClientProvider>,
    );

    for (const {
      date,
      avgtemp_c,
      condition,
      icon,
    } of mockWeekForecastData.dayForecasts.slice(
      1,
      mockWeekForecastData.dayForecasts.length,
    )) {
      const weekday = dayjs(date).format('ddd');
      const tempTextMatcher = (content: string) =>
        content.includes(`${avgtemp_c}`) && content.includes('℃');
      expect(await screen.findByText(tempTextMatcher)).toBeInTheDocument();
      await screen.findByText(weekday);
      const img = screen.getByAltText(condition);
      expect(img).toHaveAttribute('src', icon);
    }
  });

  it('should handle empty data', async () => {
    server.use(
      http.get(`${API_URL}forecast/week`, () => {
        return HttpResponse.json({
          forecast: {},
        });
      }),
    );

    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeekForecast />
      </QueryClientProvider>,
    );

    await screen.findByText(/zod validation error/i);
  });

  it('should throw an error when API returns 400', async () => {
    server.use(
      http.get(`${API_URL}forecast/week`, () => {
        return HttpResponse.json(null, { status: 400 });
      }),
    );

    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeekForecast />
      </QueryClientProvider>,
    );

    await screen.findByText(/network error/i);
  });
});
