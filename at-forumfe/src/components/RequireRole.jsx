import React from "react";
import getCurrentUser from "../hooks/loginPlugin";
import { Navigate } from "react-router-dom";
export default function RequireRole({ allowedRoles, children }) {
  const user = getCurrentUser();

  if (!user) {
    alert("User is not logged in or token is invalid.");
    return <Navigate to="/unauthorized" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    alert("User does not have the required role:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
