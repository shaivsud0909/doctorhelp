import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/doctor-login" replace />;
  }

  // In a real app, you would decode the token to check the user's role
  // For simplicity, we'll just check if token exists
  // You can add role verification here if needed
  
  return <Outlet />;
};

export default ProtectedRoute;