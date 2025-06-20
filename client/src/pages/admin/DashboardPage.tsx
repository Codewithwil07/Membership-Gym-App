import ReportCard from "@/components/admin/ReportCard";
import AttendanceChart from "@/components/admin/AttendanceChart";
import NewPaymentChart from "@/components/admin/NewPayments";

const hourlyData = [
  { label: "06:00", count: 5 },
  { label: "07:00", count: 8 },
  { label: "08:00", count: 15 },
  { label: "09:00", count: 12 },
  { label: "10:00", count: 7 },
  { label: "11:00", count: 10 },
  { label: "12:00", count: 4 },
];

export default function DashboardPage() {
  return (
    <main className="p-4 grid gap-4">
      <div className="flex items-center gap-4">
        <ReportCard title="Active Members" value={120} />
        <ReportCard title="Today's Attendance" value={85} />
        <ReportCard title="New Payments" value={5} />
      </div>
      <AttendanceChart mode="hourly" data={hourlyData} />
      <NewPaymentChart />
    </main>
  );
}
