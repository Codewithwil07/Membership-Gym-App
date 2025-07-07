import { useState } from "react";
import AttendanceTable from "@/components/admin/AttendanceTable";
import ScanQRCodePanel from "@/components/admin/ScanQRCodePanel";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

export default function AbsensiPage() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const { toast } = useToast();

  const handleScan = async (decodedText: string) => {
    const id = decodedText.split("-")[1]; // ✅ ambil id dari QR
    try {
      const res = await api.post(`/api/absensi/${id}`);

      toast({
        title: "Attendance Recorded",
        description: `Attendance for ID ${decodedText} recorded successfully.`,
      });

      setReloadTrigger((prev) => prev + 1); // ✅ trigger refetch
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Error submitting attendance.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
      <div className="md:col-span-2">
        <AttendanceTable reloadTrigger={reloadTrigger} />
      </div>
      <ScanQRCodePanel onScan={handleScan} />
    </main>
  );
}
