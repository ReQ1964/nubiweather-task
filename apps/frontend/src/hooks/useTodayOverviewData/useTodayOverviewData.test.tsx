import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTodayOverviewData } from './useTodayOverviewData';
import { QueryClientProvider } from '@tanstack/react-query';
import { mockedQueryClient } from '@/libs/vitest/mocks/tanstackQuery';
import { ReactNode } from 'react';
import { mockOverviewData } from '@/libs/vitest/mocks/handlers';

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={mockedQueryClient}>
    {children}
  </QueryClientProvider>
);

describe('useForecastData', () => {
  it('should return the correct data', async () => {
    const { result } = renderHook(() => useTodayOverviewData('Gliwice'), {
      wrapper: Providers,
    });

    await waitFor(() => expect(result.current.data).toEqual(mockOverviewData));
  });
});
