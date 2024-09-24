import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ForecastTile from './ForecastTile';

describe('ForecastTile', () => {
  const topInfo = 'Today';
  const temperature = 25;
  const weatherIcon = 'http://example.com/icon.png';
  const weatherText = 'Sunny';

  const props = {
    topInfo,
    temperature,
    weatherIcon,
    weatherText,
    first: false,
  };

  it('should render ForecastTile with correct data', () => {
    render(<ForecastTile {...props} />);

    expect(screen.getByText(topInfo)).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(`${temperature}`, 'i')),
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute('src', weatherIcon);
    expect(screen.getByRole('img')).toHaveAttribute('alt', weatherText);
  });
});
