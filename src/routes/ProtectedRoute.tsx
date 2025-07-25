import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { useAuth } from "../context/AuthContext";

// A wrapper component to block access to private routes
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // If logged in, render the route
  // Else, redirect to /login
  return isAuthenticated ? children : <Navigate to="/login" />;
};
