import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth-context';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.warn("User not authenticated, redirecting to /login");
    return <Navigate to="/login" />;
  }

  return children;
}


export default ProtectedRoute;