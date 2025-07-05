import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AbsensiData {
  id: number;
  username: string;
  tanggal: string;
  status: "valid" | "invalid";
}

export default function AbsensiTable() {
  const [data, setData] = useState<AbsensiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:3000/api/absensi?limit=${rowsPerPage}&page=${currentPage}`,
        { credentials: "include" }
      );
      const json = await res.json();

      if (res.ok) {
        // Pastikan backend mengembalikan { data: [ ... ] }
        const apiData = json.data.data.map((item: any) => ({
          id: item.id,
          username: item.username,
          tanggal: item.created_at.slice(0, 10),
          status: item.status_absensi, // pastikan field ini sesuai
        }));
        setData(apiData);
      } else {
        setError(json.message || "Failed to fetch data.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Records (API)</CardTitle>
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
                  data.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-muted/50">
                      <td className="py-2">{a.username}</td>
                      <td className="py-2">{a.tanggal}</td>
                      <td
                        className={`py-2 font-semibold ${
                          a.status === "valid" ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {a.status}
                      </td>
                    </tr>
                  ))
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
