import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/libs/vitest/mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '@/constants/api';
import DayForecast from './DayForecast';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';

describe('DayForecast', () => {
  it('should display correct mocked data', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <DayForecast />
      </QueryClientProvider>
    );

    const dataAssertions = [
      { time: '14:00', temp: /20/i, altText: 'Clear1', iconSrc: 'icon1' },
      { time: '15:00', temp: /30/i, altText: 'Clear2', iconSrc: 'icon2' },
      { time: '00:00', temp: /25/i, altText: 'Clear3', iconSrc: 'icon3' },
      { time: '01:00', temp: /35/i, altText: 'Clear4', iconSrc: 'icon4' },
    ];

    for (const { time, temp, altText, iconSrc } of dataAssertions) {
      await screen.findByText(time);
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
        <DayForecast />
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
        <DayForecast />
      </QueryClientProvider>
    );

    await screen.findByText(/request failed with status code 400/i);
  });
});
