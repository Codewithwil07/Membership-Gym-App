import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import DashboardNavbar from "@/components/admin/DashboardNavbar";

export default function AdminLayout() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/member/dashboard" replace />;
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
