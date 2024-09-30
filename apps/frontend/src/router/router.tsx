import BaseLayout from '@/layouts/BaseLayout';
import HomePage from '@/pages/HomePage';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import RedirectFromAuthWrapper from './RedirectFromAuthWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <div>account</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <RedirectFromAuthWrapper>
        <BaseLayout />
      </RedirectFromAuthWrapper>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: 'register', element: <div>register</div> },
      { path: 'login', element: <div>login</div> },
      { index: true, element: <Navigate to="/auth/login" replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
