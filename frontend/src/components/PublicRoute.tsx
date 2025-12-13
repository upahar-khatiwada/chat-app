// This component prevents authenticated user from going back to signin and signout pages as it makes no sense to do that

import React from "react";
import { Navigate } from "react-router-dom";
import type User from "../interfaces/user_interface";

interface PublicRouteProps {
  children: React.ReactNode;
  user: User | null;
}

const PublicRoute = ({ children, user }: PublicRouteProps) => {
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
