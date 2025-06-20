interface Report {
  id: number;
  user: string;
  packageName: string;
  transactionDate: string;
  paymentMethod: string;
  amount: number;
  status: string;
}

const dummyReports: Report[] = [
  {
    id: 1,
    user: "John Doe",
    packageName: "Gold",
    transactionDate: "2025-06-19",
    paymentMethod: "Bank Transfer",
    amount: 500000,
    status: "Verified",
  },
  {
    id: 2,
    user: "Jane Smith",
    packageName: "Silver",
    transactionDate: "2025-06-18",
    paymentMethod: "Credit Card",
    amount: 300000,
    status: "Pending",
  },
];

export default function ReportTable({
  filters,
}: {
  filters: { mode: string; date: string };
}) {
  const filtered = dummyReports.filter((r) => {
    if (!filters.mode || !filters.date) return true;
    if (filters.mode === "day") return r.transactionDate === filters.date;
    if (filters.mode === "month")
      return r.transactionDate.startsWith(filters.date);
    if (filters.mode === "year")
      return r.transactionDate.startsWith(filters.date);
    return true;
  });

  const total = filtered
    .filter((r) => r.status === "Verified")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="bg-card p-4 rounded shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">User</th>
            <th className="py-2 text-left">Package</th>
            <th className="py-2 text-left">Transaction Date</th>
            <th className="py-2 text-left">Payment Method</th>
            <th className="py-2 text-left">Amount</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-b hover:bg-muted/50">
              <td className="py-2">{r.user}</td>
              <td className="py-2">{r.packageName}</td>
              <td className="py-2">{r.transactionDate}</td>
              <td className="py-2">{r.paymentMethod}</td>
              <td className="py-2">Rp {r.amount.toLocaleString()}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    r.status === "Verified"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-2 text-center text-muted-foreground"
              >
                No report data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-2 text-right font-semibold">
        Total Verified Revenue: Rp {total.toLocaleString()}
      </div>
    </div>
  );
}
