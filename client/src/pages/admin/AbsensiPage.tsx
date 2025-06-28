import AttendanceTable from "@/components/admin/AttendanceTable";
import ScanQRCodePanel from "@/components/admin/ScanQRCodePanel";

export default function AbsensiPage() {
  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
      <div className="md:col-span-2">
        <AttendanceTable />
      </div>

      <ScanQRCodePanel  />
    </main>
  );
}
