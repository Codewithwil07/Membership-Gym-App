// src/routes/MemberRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import Layout from "@/components/member/Layout";
import { useAuth } from "@/context/AuthContext";

export default function MemberRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "member") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
