import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useForecastData } from './useForecastData';
import { QueryClientProvider } from '@tanstack/react-query';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { ReactNode } from 'react';
import { mockForecastData } from '@/libs/vitest/mocks/handlers';

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={mockedQueryClient}>
    {children}
  </QueryClientProvider>
);

describe('useForecastData', () => {
  it('should return the correct data', async () => {
    const { result } = renderHook(() => useForecastData('Gliwice', 2), {
      wrapper: Providers,
    });

    await waitFor(() => expect(result.current.data).toEqual(mockForecastData));
  });
});
