    import { useState } from "react";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    // import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";
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
        transactionDate: "2025-06-19",
        paymentMethod: "Bank Transfer",
        image_proof: "img.jpg",
        verificationStatus: "Pending"
      },
      {
        id: 2,
        user: "Jane Smith",
        packageName: "Silver",
        transactionDate: "2025-06-18",
        paymentMethod: "Credit Card",
        image_proof: "img.jpg",
        verificationStatus: "Verified",
      },
    ];

    export default function PaymentVerificationTable() {
      const [searchTerm, setSearchTerm] = useState("");
      const [filterDate, setFilterDate] = useState("All");

      const filteredPayments = allPayments.filter((p) => {
        const matchName = p.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDate = filterDate ? p.transactionDate === filterDate : true;
        return matchName && matchDate;
      });

      return (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle>Payment List</CardTitle>
              <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64"
                />
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-xs text-muted-foreground">
                    Filter by date
                  </span>
                  <Select value={filterDate} onValueChange={setFilterDate}>
                    <SelectTrigger className="w-full md:w-40">
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
                  <th className="py-2 text-left">Image Proof</th>
                  <th className="py-2 text-left">Verification Status</th>
                </tr>
              </thead>
              <tbody>
                {allPayments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-muted/50">
                    <td className="py-2">{p.user}</td>
                    <td className="py-2">{p.packageName}</td>
                    <td className="py-2">
                      {format(new Date(p.transactionDate), "yyyy-MM-dd")}
                    </td>
                    <td className="py-2">{p.paymentMethod}</td>
                    <td className="py-2">{p.image_proof}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          p.verificationStatus === "Verified"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {p.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-2 text-center text-muted-foreground"
                    >
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      );
    }
