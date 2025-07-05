import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Package {
  id: number;
  nama_paket: string;
  deskripsi: string;
  durasi_hari: number;
  harga: number;
}

export default function PaketTable() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/admin/paket", {
        credentials: "include",
      });
      const data = await res.json();
      setPackages(data.data); // pastikan backendmu mengirim { data: [...] }
    } catch (err) {
      console.error(err);
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirm) return;
    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:3000/admin/paket-hapus/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.message || "Failed to delete package");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting package");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Package List</CardTitle>
          <Link to="/admin/packages/add">
            <Button size="sm">Add Package</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            Loading packages...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : packages.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            No packages found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Duration (days)</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">{pkg.nama_paket}</td>
                  <td className="py-2">{pkg.durasi_hari}</td>
                  <td className="py-2">{pkg.deskripsi}</td>
                  <td className="py-2">
                    Rp. {Number(pkg.harga).toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 space-x-2">
                    <Link to={`/admin/packages/edit/${pkg.id}`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={deletingId === pkg.id}
                      onClick={() => handleDelete(pkg.id)}
                    >
                      {deletingId === pkg.id ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4 mr-1" />{" "}
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
