import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/libs/vitest/mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '@/constants/api';
import WeekForecast from './WeekForecast';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';

describe('DayForecast', () => {
  it('should display correct mocked data (without the 1st day)', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeekForecast />
      </QueryClientProvider>
    );

    const dataAssertions = [
      { day: 'Sun', temp: /22/i, altText: 'Clear', iconSrc: 'dayIcon2' },
    ];

    for (const { day, temp, altText, iconSrc } of dataAssertions) {
      await screen.findByText(day);
      await screen.findByText(temp);
      const img = screen.getByAltText(altText);
      expect(img).toHaveAttribute('src', iconSrc);
    }
  });

  it('should handle empty data', async () => {
    server.use(
      http.get(`${API_URL}forecast.json`, () => {
        return HttpResponse.json({
          forecast: {},
        });
      })
    );

    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeekForecast />
      </QueryClientProvider>
    );

    await screen.findByText(/error: required/i);
  });

  it('should throw an error when API returns 400', async () => {
    server.use(
      http.get(`${API_URL}forecast.json`, () => {
        return HttpResponse.json(null, { status: 400 });
      })
    );

    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeekForecast />
      </QueryClientProvider>
    );

    await screen.findByText(/request failed with status code 400/i);
  });
});
