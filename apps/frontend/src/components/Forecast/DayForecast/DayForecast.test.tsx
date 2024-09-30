import { API_URL } from '@/constants/api';
import { mockForecastData } from '@/libs/vitest/mocks/handlers';
import { server } from '@/libs/vitest/mocks/server';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import DayForecast from './DayForecast';

describe('DayForecast', () => {
  it('should display correct mocked data', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <DayForecast />
      </QueryClientProvider>,
    );

    for (const day of mockForecastData.dayForecasts) {
      for (const { hour, temp_c, condition, icon } of day.hourForecasts) {
        await screen.findByText(hour);
        const tempTextMatcher = (content: string) =>
          content.includes(`${temp_c}`) && content.includes('℃');
        expect(await screen.findByText(tempTextMatcher)).toBeInTheDocument();
        const img = screen.getByAltText(condition);
        expect(img).toHaveAttribute('src', icon);
      }
    }
  });

  it('should handle empty data', async () => {
    server.use(
      http.get(`${API_URL}forecast/oneDay`, () => {
        return HttpResponse.json({
          forecast: {},
        });
      }),
    );

    render(
      <QueryClientProvider client={mockedQueryClient}>
        <DayForecast />
      </QueryClientProvider>,
    );

    await screen.findByText(/zod validation error/i);
  });

  it('should throw an error when API returns 400', async () => {
    server.use(
      http.get(`${API_URL}forecast/oneDay`, () => {
        return HttpResponse.json(null, { status: 400 });
      }),
    );

    render(
      <QueryClientProvider client={mockedQueryClient}>
        <DayForecast />
      </QueryClientProvider>,
    );

    await screen.findByText(/Network error/i);
  });
});
