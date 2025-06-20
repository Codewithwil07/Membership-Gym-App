import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import DashboardNavbar from "@/components/admin/DashboardNavbar";

export default function AdminRoute() {
  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
