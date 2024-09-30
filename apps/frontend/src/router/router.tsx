import BaseLayout from '@/layouts/BaseLayout';
import HomePage from '@/pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <BaseLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>Page not found!</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/account',
        element: <div>account</div>,
      },
    ],
  },
  {
    path: '/register',
    element: <div>authRegister</div>,
  },
  {
    path: '/login',
    element: <div>authLogin</div>,
  },
]);

export default router;
