import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import api from "@/api/axios";

interface Package {
  id: number;
  nama_paket: string;
  deskripsi: string;
  durasi_hari: number;
  harga: number;
}

export default function PaketTable() {
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/paket", {
        withCredentials: true,
      });
      setPackages(res.data.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Gagal memuat paket",
        description: "Periksa koneksi atau server Anda.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      const res = await api.delete(
        `/admin/paket-hapus/${id}`,
        { withCredentials: true }
      );

      setPackages((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Paket berhasil dihapus",
        description: `Paket ID ${id} telah dihapus.`,
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Gagal menghapus paket",
        description:
          err?.response?.data?.message || "Terjadi kesalahan saat menghapus paket.",
        variant: "destructive",
      });
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
          <CardTitle>Daftar Paket</CardTitle>
          <Link to="/admin/packages/add">
            <Button size="sm">Tambah Paket</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            Memuat paket...
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            Tidak ada paket ditemukan.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Nama</th>
                <th className="py-2 text-left">Durasi (hari)</th>
                <th className="py-2 text-left">Deskripsi</th>
                <th className="py-2 text-left">Harga</th>
                <th className="py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">{pkg.nama_paket}</td>
                  <td className="py-2">{pkg.durasi_hari}</td>
                  <td className="py-2">{pkg.deskripsi}</td>
                  <td className="py-2">
                    Rp {Number(pkg.harga).toLocaleString("id-ID")}
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
                          <Loader2 className="animate-spin w-4 h-4 mr-1" />
                          Menghapus...
                        </>
                      ) : (
                        "Hapus"
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
