import { API_URL } from '@/constants/api';
import { server } from '@/libs/vitest/mocks/server';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
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

    const dataAssertions = [
      {
        time: '2024-09-24 14:00',
        temp: /20/i,
        altText: 'Clear1',
        iconSrc: 'icon1',
      },
      {
        time: '2024-09-24 15:00',
        temp: /30/i,
        altText: 'Clear2',
        iconSrc: 'icon2',
      },
      {
        time: '2024-09-24 00:00',
        temp: /25/i,
        altText: 'Clear3',
        iconSrc: 'icon3',
      },
      {
        time: '2024-09-24 01:00',
        temp: /35/i,
        altText: 'Clear4',
        iconSrc: 'icon4',
      },
    ];

    for (const { time, temp, altText, iconSrc } of dataAssertions) {
      await screen.findByText(dayjs(time).format('hh:mm A'));
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
      http.get(`${API_URL}forecast.json`, () => {
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
