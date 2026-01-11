import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { token } = useAuth();

  // If no token exists, redirect to Login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the child route (Dashboard)
  return <Outlet />;
}