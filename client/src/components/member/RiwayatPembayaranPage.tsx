import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const payments = [
  { id: 1, packageName: "Gold Membership", date: "2025-06-01", status: "Verified" },
  { id: 2, packageName: "Silver Membership", date: "2025-05-01", status: "Verified" },
];

export default function RiwayatPembayaranPage() {
  return (
    <main className="p-4">
      <Card>
        <CardHeader><CardTitle>Riwayat Pembayaran</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Paket</th>
                <th className="py-2 text-left">Tanggal</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">{p.packageName}</td>
                  <td className="py-2">{p.date}</td>
                  <td className="py-2">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}