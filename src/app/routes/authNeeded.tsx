import React, { type FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { authSelectors } from 'src/entities/auth/store';

export const AuthNeeded: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
