// src/components/ProtectedRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.name) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
