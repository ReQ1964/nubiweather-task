import { QueryClient } from '@tanstack/react-query';

export const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
