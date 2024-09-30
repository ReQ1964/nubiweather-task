import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
