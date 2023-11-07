// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  // If there's no access token or the role isn't appropriate, redirect to the login page
  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the component passed in props
  return <Component {...rest} />;
};

export default ProtectedRoute;
