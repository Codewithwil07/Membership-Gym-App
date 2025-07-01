import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const attendance = [
  { id: 1, date: "2025-06-10", method: "QR Scan" },
  { id: 2, date: "2025-06-09", method: "QR Scan" },
];

export default function RiwayatAbsensiPage() {
  return (
    <main className="p-4">
      <Card>
        <CardHeader><CardTitle>Riwayat Absensi</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Tanggal</th>
                <th className="py-2 text-left">Metode</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">{a.date}</td>
                  <td className="py-2">{a.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}