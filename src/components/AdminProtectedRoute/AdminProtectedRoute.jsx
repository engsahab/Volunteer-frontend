import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


function AdminProtectedRoute({ user }) {


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (!user.is_staff) {
   
    return <Navigate to="/opportunities" replace />;
  }


  return <Outlet />;
}

export default AdminProtectedRoute;