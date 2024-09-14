import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodayHighlight from './TodayHighlight';

// Mock TodayHighlightTile component
vi.mock('../TodayHighlightTile/TodayHighlightTile', () => ({
  TodayHighlightTile: ({
    heading,
    text,
    icon,
  }: {
    heading: string;
    text: string;
    icon: string;
  }) => (
    <div>
      <div>{heading}</div>
      <div>{text}</div>
      <div>{icon}</div>
    </div>
  ),
}));

describe('TodayHighlight', () => {
  it('renders correctly with provided props', () => {
    const props = {
      humidity: 80,
      heatIndex: 35,
      uv: 7,
      precipitation: 5,
      windSpeed: 20,
      visibility: 10,
    };

    render(<TodayHighlight {...props} />);

    expect(screen.getByText(/today's highlights/i)).toBeInTheDocument();

    expect(screen.getByText('UV Index')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('20 km/h')).toBeInTheDocument();
    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(screen.getByText('10 km')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('Rain Chance')).toBeInTheDocument();
    expect(screen.getByText('5 mm')).toBeInTheDocument();
    expect(screen.getByText('Heat Index')).toBeInTheDocument();
    expect(screen.getByText('35°C')).toBeInTheDocument();
  });
});
