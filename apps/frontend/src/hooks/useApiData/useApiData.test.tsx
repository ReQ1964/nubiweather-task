import { mockCurrentWeatherData } from '@/libs/vitest/mocks/handlers';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { describe, expect, it } from 'vitest';

import { useApiData } from './useApiData';

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={mockedQueryClient}>
    {children}
  </QueryClientProvider>
);

describe('useApiData', () => {
  it('should return the correct data', async () => {
    const { result } = renderHook(
      () =>
        useApiData(
          'Gliwice',
          'http://localhost:5000/currentWeather',
          CurrentWeatherSchema,
          'overviewTest',
        ),
      {
        wrapper: Providers,
      },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockCurrentWeatherData);
    });
  });
});
