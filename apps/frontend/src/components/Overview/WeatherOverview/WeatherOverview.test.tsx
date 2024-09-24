import { mockCurrentWeatherData } from '@/libs/vitest/mocks/handlers';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import WeatherOverview from './WeatherOverview';

describe('WeatherOverview', () => {
  it('should render with mocked data', async () => {
    render(
      <QueryClientProvider client={mockedQueryClient}>
        <WeatherOverview />
      </QueryClientProvider>,
    );

    const { name, country, localtime, temp_c, condition, icon } =
      mockCurrentWeatherData;

    const formattedDate = dayjs(localtime).format('dddd, D MMMM');

    expect(await screen.findByText(`${name}, ${country}`)).toBeInTheDocument();
    expect(await screen.findByText(formattedDate)).toBeInTheDocument();
    expect(await screen.findByText(condition)).toBeInTheDocument();

    const tempTextMatcher = (content: string) =>
      content.includes(`${temp_c}`) && content.includes('℃');
    expect(await screen.findByText(tempTextMatcher)).toBeInTheDocument();

    const iconElement = await screen.findByAltText(condition);
    expect(iconElement).toHaveAttribute('src', icon);
  });
});
