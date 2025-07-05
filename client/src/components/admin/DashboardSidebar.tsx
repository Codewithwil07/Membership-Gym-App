import {
  Home,
  Users,
  Package,
  CreditCard,
  CalendarDays,
  BarChart3,
  DollarSign,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSidebar() {
  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: Home },
    { path: "/admin/members", label: "Members", icon: Users },
    { path: "/admin/packages", label: "Packages", icon: Package },
    { path: "/admin/transactions", label: "Payments", icon: CreditCard },
    { path: "/admin/attendance", label: "Daily Attendance", icon: CalendarDays },
    { path: "/admin/expenses", label: "Expenses", icon: DollarSign },
    { path: "/admin/reports", label: "Reports", icon: BarChart3 },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <aside className="hidden md:flex w-64 bg-card border-r flex-col shadow-lg">
      <div className="p-4 font-bold text-lg text-primary">
        Platinum Gym Admin
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              pathname === path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 m-4 rounded-md text-red-600 hover:bg-red-100 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
