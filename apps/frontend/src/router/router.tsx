import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import BaseLayout from '@/layouts/BaseLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import RedirectFromAuthWrapper from './RedirectFromAuthWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '/account',
    element: (
      <ProtectedRoute>
        <AuthorizedLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <div>Account</div> }],
  },
  {
    path: '/auth',
    element: (
      <RedirectFromAuthWrapper>
        <AuthorizedLayout />
      </RedirectFromAuthWrapper>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: 'register', element: <div>register</div> },
      { path: 'login', element: <LoginPage /> },
      { index: true, element: <Navigate to="/auth/login" replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
