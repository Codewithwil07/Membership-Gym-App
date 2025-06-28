// DashboardPage.tsx
import DashboardCard from "@/components/admin/DashboardCard";
import AttendanceChart from "@/components/admin/AttendanceChart";
import RevenueChart from "@/components/admin/RevenueChart";
import LatestPaymentsTable from "@/components/admin/LatestPaymentsTable";
import LatestAttendanceTable from "@/components/admin/LatestAttendanceTable";
import { Users, CalendarCheck, CreditCard, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Members"
          value={128}
          icon={<Users className="w-6 h-6" />}
        />
        <DashboardCard
          title="Today's Attendance"
          value={32}
          icon={<CalendarCheck className="w-6 h-6" />}
        />
        <DashboardCard
          title="Today's Transactions"
          value={18}
          icon={<CreditCard className="w-6 h-6" />}
        />
        <DashboardCard
          title="Today's Revenue"
          value="Rp 1.200.000"
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AttendanceChart />
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LatestPaymentsTable />
        <LatestAttendanceTable />
      </div>
    </main>
  );
}
