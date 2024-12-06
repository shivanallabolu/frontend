import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user'); // Check if the user is logged in
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
