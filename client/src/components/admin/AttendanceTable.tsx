
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AbsensiData {
  id: number;
  username: string;
  tanggal: string;
  metode: "qr";
  status: "valid" | "invalid";
}

const allAbsensi: AbsensiData[] = [
  { id: 1, username: "sudi", tanggal: "2025-06-25", metode: "qr", status: "valid" },
  { id: 2, username: "joko", tanggal: "2025-06-25", metode: "qr", status: "invalid" },
  { id: 3, username: "budi", tanggal: "2025-06-25", metode: "qr", status: "valid" },
  { id: 4, username: "rini", tanggal: "2025-06-25", metode: "qr", status: "valid" },
  { id: 5, username: "agus", tanggal: "2025-06-25", metode: "qr", status: "invalid" },
  { id: 6, username: "sari", tanggal: "2025-06-25", metode: "qr", status: "valid" },
  // Tambahkan lebih banyak data dummy jika perlu
];

export default function AbsensiTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(allAbsensi.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = allAbsensi.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Records</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Username</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Method</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((a) => (
              <tr key={a.id} className="border-b hover:bg-muted/50">
                <td className="py-2">{a.username}</td>
                <td className="py-2">{a.tanggal}</td>
                <td className="py-2 capitalize">{a.metode}</td>
                <td className={`py-2 font-semibold ${a.status === "valid" ? "text-green-600" : "text-red-500"}`}>
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button size="sm" variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
