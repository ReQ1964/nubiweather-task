import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import ForecastPanel from './ForecastPanel';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';

vi.mock('../DayForecast/DayForecast', () => ({
  __esModule: true,
  default: () => <div>Day Forecast</div>,
}));

vi.mock('../WeekForecast', () => ({
  __esModule: true,
  default: () => <div>Week Forecast</div>,
}));

describe('ForecastPanel', () => {
  const user = userEvent.setup();

  it('should render DayForecast component initially', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <ForecastPanel />
      </QueryClientProvider>
    );
    expect(screen.getByText('Day Forecast')).toBeInTheDocument();
  });

  it('should render WeekForecast component when forecastMode is set to "week"', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <ForecastPanel />
      </QueryClientProvider>
    );
    const toggler = screen.getByText('Week');
    await user.click(toggler);

    expect(screen.getByText('Week Forecast')).toBeInTheDocument();
  });
});
