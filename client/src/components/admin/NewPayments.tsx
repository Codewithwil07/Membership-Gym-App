import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Payment {
  id: number;
  user: string;
  package: string;
  amount: number;
  time: string;
  status: string;
}

const dummyPayments: Payment[] = [
  {
    id: 1,
    user: "John Doe",
    package: "Gold",
    amount: 500000,
    time: "2025-06-21 09:00",
    status: "Verified",
  },
  {
    id: 2,
    user: "Jane Smith",
    package: "Silver",
    amount: 300000,
    time: "2025-06-21 10:30",
    status: "Pending",
  },
  {
    id: 3,
    user: "Bob Lee",
    package: "Gold",
    amount: 500000,
    time: "2025-06-21 12:45",
    status: "Verified",
  },
];

export default function NewPaymentTable() {
  const total = dummyPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>New Payments (This Month)</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1">User</th>
              <th className="text-left py-1">Package</th>
              <th className="text-left py-1">Amount</th>
              <th className="text-left py-1">Time</th>
              <th className="text-left py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-muted/50">
                <td className="py-1">{p.user}</td>
                <td className="py-1">{p.package}</td>
                <td className="py-1">Rp {p.amount.toLocaleString()}</td>
                <td className="py-1">{p.time}</td>
                <td className="py-1">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      p.status === "Verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 text-right font-semibold">
          Total: Rp {total.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
