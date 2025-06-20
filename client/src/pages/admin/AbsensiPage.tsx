import { useState } from "react";
import AttendanceTable from "@/components/admin/AttendanceTable";
import ScanQRCodePanel from "@/components/admin/ScanQRCodePanel";
import AttendanceForm from "@/components/admin/AttendanceForm";

export default function AbsensiPage() {
  const [modalAttendance, setModalAttendance] = useState(false);
  const [attendance, setAttendance] = useState([
    { id: 1, user: "John Doe", date: "2025-06-19", method: "QR", note: "" },
  ]);

  const handleScan = (result: string) => {
    setAttendance((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: `Scanned: ${result}`,
        date: new Date().toISOString().slice(0, 10),
        method: "QR",
        note: "",
      },
    ]);
  };

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
      <div className="md:col-span-2">
        <AttendanceTable
          data={attendance}
          onClick={() => setModalAttendance(true)} // trigger open form
        />
      </div>

      <ScanQRCodePanel onScan={handleScan} />

      {modalAttendance && (
        <AttendanceForm
          className="md:col-span-3 absolute w-1/2 mx-40 my-24"
          onSubmit={(data) => {
            setAttendance((prev) => [
              ...prev,
              { id: prev.length + 1, ...data },
            ]);
            setModalAttendance(false);
          }}
        />
      )}
    </main>
  );
}
