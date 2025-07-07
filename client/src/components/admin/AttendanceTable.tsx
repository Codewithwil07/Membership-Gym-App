// src/components/admin/AttendanceTable.tsx

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import api from "@/api/axios";

interface AbsensiData {
  id: number;
  username: string;
  tanggal: string;
}

export default function AttendanceTable({
  reloadTrigger = 0,
}: {
  reloadTrigger?: number;
}) {
  const [data, setData] = useState<AbsensiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(
        `/api/absensi?limit=${rowsPerPage}&page=${currentPage}`,
        { withCredentials: true }
      );

      const apiData = res.data.data.data.map((item: any) => ({
        id: item.id,
        username: item.username,
        tanggal: item.created_at.slice(0, 10),
      }));
      setData(apiData);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Error fetching attendance data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, reloadTrigger]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Records</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
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
                  <th className="py-2 text-left">Username</th>
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((a) => {
                    const formattedDate = format(a.tanggal, "dd-MM-yyyy");
                    return (
                      <tr key={a.id} className="border-b hover:bg-muted/50">
                        <td className="py-2">{a.username}</td>
                        <td className="py-2">{formattedDate}</td>
                        <td className="py-2 font-semibold text-green-600">
                          valid
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-4 text-center text-muted-foreground"
                    >
                      No attendance found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-muted-foreground">
                Page {currentPage}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNext}
                  disabled={data.length < rowsPerPage}
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
