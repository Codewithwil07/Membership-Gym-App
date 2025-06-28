// components/admin/LatestPaymentsTable.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const payments = [
  { id: 1, user: "Budi", package: "Gold", date: "2025-06-25", amount: "Rp 300.000" },
  { id: 2, user: "Sari", package: "Silver", date: "2025-06-25", amount: "Rp 250.000" },
];

export default function LatestPaymentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">User</th>
              <th className="py-2 text-left">Package</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-muted/50">
                <td className="py-2">{p.user}</td>
                <td className="py-2">{p.package}</td>
                <td className="py-2">{p.date}</td>
                <td className="py-2">{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
