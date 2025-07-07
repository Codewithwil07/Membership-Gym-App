// DashboardPage.tsx
import { useEffect, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";
import { Users, CalendarCheck, CreditCard, DollarSign } from "lucide-react";
import { isWithinInterval, parseISO, subDays, format, startOfDay, endOfDay } from "date-fns";
import api from "@/api/axios";

export default function DashboardPage() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [todayTransactions, setTodayTransactions] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);

  useEffect(() => {
    // Fetch total members
    api
      .get("/admin/user-data/?page=1&limit=1000&search=", {
        withCredentials: true,
      })
      .then((res) => {
        const members = res.data.data.data.filter(
          (u: any) => u.role === "member"
        );
        setTotalMembers(members.length);
      })
      .catch(console.error);

    // Fetch today attendance
    api
      .get("/api/absensi?limit=1000&page=1&search=", {
        withCredentials: true,
      })
      .then((res) => {
        const totalToday = res.data.data.pagination.total;
        setTodayAttendance(totalToday);
      })
      .catch(console.error);

    // Fetch today transactions
    api
      .get(
        "/api/transaksi/transaksi-data?page=1&limit=1000",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const transactions = res.data.data.data;
        const today = new Date();
        const filtered = transactions.filter((t: any) => {
          const date = parseISO(t.created_at);
          return isWithinInterval(date, {
            start: subDays(today, 1),
            end: today,
          });
        });
        setTodayTransactions(filtered.length);
      })
      .catch(console.error);

    const now = new Date();
    // Fetch today revenue
    const tahun = format(now, "yyyy");
    const bulan = format(now, "MM");

    api
      .get(
        `/api/transaksi/laporan-keuangan?month=${tahun}-${bulan}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const today = new Date();
        const todayStart = startOfDay(today);
        const todayEnd = endOfDay(today);

        const revenueData = res.data.data.detail_pemasukan.data;
        
        
        
        // filter 24 jam hari ini
        const todayTransactions = revenueData.filter((item) => {
          const date = parseISO(item.transaction_date);
          return isWithinInterval(date, { start: todayStart, end: todayEnd });
        });

        // reduce total amount
        const totalTodayRevenue = todayTransactions.reduce((acc, curr) => {
          return acc + parseFloat(curr.amount);
        }, 0);
        
        const formattedRevenue = `Rp ${totalTodayRevenue.toLocaleString("id-ID")}`;
        setTodayRevenue(formattedRevenue);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Members"
          value={totalMembers}
          icon={<Users className="w-6 h-6" />}
        />
        <DashboardCard
          title="Today's Attendance"
          value={todayAttendance}
          icon={<CalendarCheck className="w-6 h-6" />}
        />
        <DashboardCard
          title="Today's Transactions"
          value={todayTransactions}
          icon={<CreditCard className="w-6 h-6" />}
        />
        <DashboardCard
          title="Today's Revenue"
          value={`${todayRevenue.toLocaleString("id-ID")}`}
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>
    </main>
  );
}
