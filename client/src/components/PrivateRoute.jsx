import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  try {
    const decoded = jwtDecode(token);
    const userRoles = decoded.roles || [];

    const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));

    if (!isAuthorized) {
      // User logged in but does not have permissions
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    // Invalid token or decoding error, redirect to login
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
