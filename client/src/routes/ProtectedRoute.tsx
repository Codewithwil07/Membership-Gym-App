import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <Outlet />;
}
