import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ForecastModeToggler from './ForecastModeToggler';
import userEvent from '@testing-library/user-event';

describe('ForecastModeToggler', () => {
  const user = userEvent.setup();

  it('should render correctly', () => {
    render(
      <ForecastModeToggler forecastMode='today' setForecastMode={vi.fn()} />
    );
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
  });

  it('should call setForecastMode with "today" when "Today" button is clicked', async () => {
    const setForecastMode = vi.fn();
    render(
      <ForecastModeToggler
        forecastMode='week'
        setForecastMode={setForecastMode}
      />
    );
    await user.click(screen.getByText('Today'));
    expect(setForecastMode).toHaveBeenCalledWith('today');
  });

  it('should call setForecastMode with "week" when "Week" button is clicked', async () => {
    const setForecastMode = vi.fn();
    render(
      <ForecastModeToggler
        forecastMode='today'
        setForecastMode={setForecastMode}
      />
    );
    await userEvent.click(screen.getByText('Week'));
    expect(setForecastMode).toHaveBeenCalledWith('week');
  });

  it('should set aria-pressed to true for "Today" button when forecastMode is "today"', () => {
    render(
      <ForecastModeToggler forecastMode='today' setForecastMode={vi.fn()} />
    );
    const todayButton = screen.getByLabelText('Today forecast mode');
    expect(todayButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should set aria-pressed to true for "Week" button when forecastMode is "week"', () => {
    render(
      <ForecastModeToggler forecastMode='week' setForecastMode={vi.fn()} />
    );
    const weekButton = screen.getByLabelText('Week forecast mode');
    expect(weekButton).toHaveAttribute('aria-pressed', 'true');
  });
});
