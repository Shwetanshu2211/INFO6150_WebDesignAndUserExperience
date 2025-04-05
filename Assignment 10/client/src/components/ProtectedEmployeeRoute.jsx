import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedEmployeeRoute = () => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userType !== 'employee') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedEmployeeRoute; 