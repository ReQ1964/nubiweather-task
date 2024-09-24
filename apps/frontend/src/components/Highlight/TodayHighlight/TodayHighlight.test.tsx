import { mockTodayHiglightData } from '@/libs/vitest/mocks/handlers';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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
  it('renders correctly with provided props', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <TodayHighlight />
      </QueryClientProvider>,
    );

    const { heatindex_c, uv, wind_kph, vis_km, humidity, precip_mm } =
      mockTodayHiglightData;

    expect(await screen.findByText(/today's highlights/i)).toBeInTheDocument();

    expect(screen.getByText('UV Index')).toBeInTheDocument();
    expect(await screen.findByText(uv)).toBeInTheDocument();

    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(await screen.findByText(`${wind_kph} km/h`)).toBeInTheDocument();

    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(await screen.findByText(`${vis_km} km`)).toBeInTheDocument();

    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(await screen.findByText(`${humidity}%`)).toBeInTheDocument();

    expect(screen.getByText('Rain Chance')).toBeInTheDocument();
    expect(await screen.findByText(`${precip_mm} mm`)).toBeInTheDocument();

    expect(screen.getByText('Heat Index')).toBeInTheDocument();
    expect(await screen.findByText(`${heatindex_c}°C`)).toBeInTheDocument();
  });
});
