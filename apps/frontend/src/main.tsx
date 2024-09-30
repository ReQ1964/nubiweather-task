import React, { ReactNode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import router from './router/router.tsx';

const queryClient = new QueryClient();
export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <Suspense fallback="load">
        <RouterProvider router={router} />
      </Suspense>
    </Providers>
  </React.StrictMode>,
);
