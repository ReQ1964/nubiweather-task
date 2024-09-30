import { API_URL } from '@/constants/api';
import { mockCurrentWeatherData } from '@/libs/vitest/mocks/handlers';
import { server } from '@/libs/vitest/mocks/server';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
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
          `${API_URL}currentWeather`,
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
  it('should throw an error when API returns 400', async () => {
    server.use(
      http.get(`${API_URL}currentWeather`, () => {
        return new HttpResponse('Bad Request', { status: 400 });
      }),
    );
    const { result } = renderHook(
      () =>
        useApiData(
          'Gliwice',
          `${API_URL}currentWeather`,
          CurrentWeatherSchema,
          'overviewTest2',
        ),
      {
        wrapper: Providers,
      },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });
});
