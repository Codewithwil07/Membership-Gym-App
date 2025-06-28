import { useState } from "react";
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
import { format } from "date-fns";

interface Payment {
  id: number;
  user: string;
  packageName: string;
  transactionDate: string; // ISO string
  paymentMethod: string;
  image_proof: string;
  verificationStatus: string;
}

const allPayments: Payment[] = [
  {
    id: 1,
    user: "John Doe",
    packageName: "Gold",
    transactionDate: "2025-06-25",
    paymentMethod: "Bank Transfer",
    image_proof: "img.jpg",
    verificationStatus: "Pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    packageName: "Silver",
    transactionDate: "2025-06-22",
    paymentMethod: "Credit Card",
    image_proof: "img.jpg",
    verificationStatus: "Verified",
  },
  {
    id: 3,
    user: "Doni",
    packageName: "Bronze",
    transactionDate: "2025-06-20",
    paymentMethod: "E-wallet",
    image_proof: "img.jpg",
    verificationStatus: "Verified",
  },
  // ... Tambah lebih banyak data
];

export default function PaymentLogTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const sortedPayments = [...allPayments].sort((a, b) => {
    if (filterDate === "Newest") {
      return new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
    } else if (filterDate === "Oldest") {
      return new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();
    }
    return 0; // Default: no sorting
  });

  const filteredPayments = sortedPayments.filter((p) =>
    p.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-3">
          <CardTitle>Payment List</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input
              placeholder="Search by user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />
            <div className="flex flex-col text-xs relative bottom-5">
              <span className="text-muted-foreground mb-1">Filter by date</span>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select date order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">User</th>
              <th className="py-2 text-left">Package</th>
              <th className="py-2 text-left">Transaction Date</th>
              <th className="py-2 text-left">Payment Method</th>
              <th className="py-2 text-left">Verification</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.length > 0 ? (
              paginatedPayments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">{p.user}</td>
                  <td className="py-2">{p.packageName}</td>
                  <td className="py-2">
                    {format(new Date(p.transactionDate), "yyyy-MM-dd")}
                  </td>
                  <td className="py-2">{p.paymentMethod}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.verificationStatus === "Verified"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {p.verificationStatus}
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
      </CardContent>
    </Card>
  );
}
