import {
  Home,
  Users,
  Package,
  CreditCard,
  CalendarDays,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: Home },
  { path: "/admin/members", label: "Members", icon: Users },
  { path: "/admin/packages", label: "Packages", icon: Package },
  { path: "/admin/transactions", label: "Payments", icon: CreditCard },
  { path: "/admin/attendance", label: "Daily Attendance", icon: CalendarDays },
  { path: "/admin/expenses", label: "Expenses", icon: DollarSign },
  { path: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export default function DashboardSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex w-64 bg-card border-r flex-col shadow-lg">
      <div className="p-4 font-bold text-lg text-primary">Platinum Gym Admin</div>
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
    </aside>
  );
}
