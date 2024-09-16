import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WeatherOverview from './WeatherOverview';

describe('WeatherOverview', () => {
  it('should render with proper props', () => {
    const props = {
      city: 'Gliwice',
      country: 'Poland',
      localtime: '2024-09-14 10:00',
      temperature: 30,
      condition: {
        text: 'Cloudy',
        icon: 'icon',
      },
    };
    render(<WeatherOverview {...props} />);

    expect(screen.getByText(new RegExp(props.city, 'i'))).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(props.country, 'i'))
    ).toBeInTheDocument();

    expect(screen.getByText(/saturday, 14 september/i)).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(props.temperature.toString(), 'i'))
    ).toBeInTheDocument();

    expect(screen.getByAltText(props.condition.text)).toBeInTheDocument();
  });
});
