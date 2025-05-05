import React from "react";
import { Navigate } from "react-router";

interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PrivateRoute = ({ isAuthenticated, children }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default PrivateRoute;
