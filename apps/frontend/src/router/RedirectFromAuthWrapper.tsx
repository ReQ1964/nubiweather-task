import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RedirectFromAuthWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = true;
  const from = location?.state?.from;

  return isAuthenticated ? <Navigate to={from ? from : '/'} /> : children;
};

export default RedirectFromAuthWrapper;
