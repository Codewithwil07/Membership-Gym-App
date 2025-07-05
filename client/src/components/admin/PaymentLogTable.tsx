// src/pages/admin/PaymentLogTable.tsx

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Payment {
  id: number;
  user: string;
  packageName: string;
  transactionDate: string;
  paymentMethod: string;
  status: string;
}

export default function PaymentLogTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const rowsPerPage = 10;

  const fetchPayments = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: rowsPerPage.toString(),
        search: searchTerm,
        sort: filterDate,
      });

      const res = await fetch(`http://localhost:3000/api/transaksi/transaksi-data?${params}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        // Pastikan response API return { data: [...], total: number }
        const apiPayments = data.data.data.map((item: any) => ({
          id: item.id,
          user: item.username,
          packageName: item.nama_paket,
          transactionDate: item.created_at,
          paymentMethod: item.metode_pembayaran,
          status: item.status,
        }));

        setPayments(apiPayments);
        // Contoh: kalau backend kirim total rows -> hitung totalPages
        const total = data.total || rowsPerPage;
        setTotalPages(Math.ceil(total / rowsPerPage));
      } else {
        setError(data.message || "Failed to fetch payments.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, filterDate]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-3">
          <CardTitle>Payment List</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input
              placeholder="Search by user..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-64"
            />
            <div className="flex flex-col text-xs relative bottom-5">
              <span className="text-muted-foreground mb-1">Filter by date</span>
              <Select
                value={filterDate}
                onValueChange={(val) => {
                  setFilterDate(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select date order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">User</th>
                  <th className="py-2 text-left">Package</th>
                  <th className="py-2 text-left">Transaction Date</th>
                  <th className="py-2 text-left">Payment Method</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-muted/50">
                      <td className="py-2">{p.user}</td>
                      <td className="py-2">{p.packageName}</td>
                      <td className="py-2">{format(new Date(p.transactionDate), "yyyy-MM-dd")}</td>
                      <td className="py-2">{p.paymentMethod}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            p.status === "paid"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-400 text-black"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
