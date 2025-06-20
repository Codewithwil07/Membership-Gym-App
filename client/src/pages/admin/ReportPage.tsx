import { useState } from "react";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import DashboardNavbar from "@/components/admin/DashboardNavbar";
import ReportCard from "@/components/admin/ReportCard";
import ReportFilter from "@/components/admin/ReportFilter";
import ReportTable from "@/components/admin/ReportTable";
import { Users, CalendarCheck, CreditCard, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
  const [filters, setFilters] = useState<{ mode: string; date: string }>({
    mode: "",
    date: "",
  });

  return (
    <main className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Financial Reports</h1>
        <Button size="sm" onClick={() => alert("Export PDF triggered!")}>
          Export PDF
        </Button>
      </div>

      {/* Filter */}
      <ReportFilter onFilterChange={setFilters} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReportCard
          title="Active Members"
          value={120}
          icon={<Users className="w-6 h-6" />}
        />
        <ReportCard
          title="Today's Attendance"
          value={85}
          icon={<CalendarCheck className="w-6 h-6" />}
        />
        <ReportCard
          title="New Payments"
          value={5}
          icon={<CreditCard className="w-6 h-6" />}
        />
        <ReportCard
          title="Total Revenue"
          value={`Rp 1.300.000`}
          icon={<PackageSearch className="w-6 h-6" />}
        />
      </div>

      {/* Table */}
      <ReportTable filters={filters} />
    </main>
  );
}
