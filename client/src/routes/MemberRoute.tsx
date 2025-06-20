import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function MemberRoute() {
  const { user } = useAuth();

  if (!user || user.role !== "member") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
