import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    // Clear localStorage to simulate logout on page refresh
    if (!isAuthenticated) {
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
