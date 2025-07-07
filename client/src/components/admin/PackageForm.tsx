// src/pages/admin/PaketFormPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

interface PaketFormData {
  nama_paket: string;
  durasi_hari: number;
  harga: number;
  deskripsi: string;
}

export default function PaketFormPage() {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<PaketFormData>({
    nama_paket: "",
    durasi_hari: 0,
    harga: 0,
    deskripsi: "",
  });

  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPaket = async () => {
        try {
          const res = await api.get(`/admin/paket/${id}`, {
            withCredentials: true,
          });
          const data = res.data.data;
          setForm({
            nama_paket: data.nama_paket,
            durasi_hari: data.durasi_hari,
            harga: data.harga,
            deskripsi: data.deskripsi,
          });
        } catch (err) {
          console.error(err);
          toast({
            title: "Gagal memuat data paket",
            description: "Pastikan koneksi stabil atau hubungi admin.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchPaket();
    }
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "durasi_hari" || name === "harga" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const url = id
        ? `/admin/paket-update/${id}`
        : `/admin/paket-tambah`;

      const method = id ? "put" : "post";

      await api({
        method,
        url,
        data: form,
        withCredentials: true,
      });

      toast({
        title: id ? "Paket berhasil diperbarui" : "Paket berhasil dibuat",
        description: `Paket "${form.nama_paket}" telah ${
          id ? "diperbarui" : "dibuat"
        } dengan sukses.`,
      });
      navigate("/admin/packages");
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Gagal menyimpan paket",
        description:
          err?.response?.data?.message || "Terjadi kesalahan pada server.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Edit Paket" : "Tambah Paket"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            Memuat data...
          </div>
        ) : (
          <>
            <Input
              placeholder="Nama Paket"
              name="nama_paket"
              value={form.nama_paket}
              onChange={handleChange}
            />
            <Input
              className="no-spinner"
              placeholder="Durasi (hari)"
              type="number"
              name="durasi_hari"
              value={form.durasi_hari === 0 ? "" : form.durasi_hari}
              onChange={handleChange}
            />
            <Input
              className="no-spinner"
              placeholder="Harga"
              type="number"
              name="harga"
              value={form.harga === 0 ? "" : form.harga}
              onChange={handleChange}
            />
            <p className="text-sm ml-2">
              Sebagai rupiah:
              <span className="ml-2 text-muted-foreground">
                Rp {Number(form.harga).toLocaleString("id-ID")}
              </span>
            </p>
            <Input
              placeholder="Deskripsi"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
            />
            <Button disabled={submitting} onClick={handleSubmit}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-1" />
                  Memproses...
                </>
              ) : id ? (
                "Perbarui Paket"
              ) : (
                "Buat Paket"
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
