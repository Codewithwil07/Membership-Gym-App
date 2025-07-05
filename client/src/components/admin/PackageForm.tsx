// src/pages/admin/PaketFormPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaketFormData {
  nama_paket: string;
  durasi_hari: number;
  harga: number;
  deskripsi: string;
}

export default function PaketFormPage() {
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

  // Fetch paket data if editing
  useEffect(() => {
    if (id) {
      const fetchPaket = async () => {
        try {
          const res = await fetch(`http://localhost:3000/admin/paket/${id}`, {
            credentials: "include",
          });
          const data = await res.json();
          setForm({
            nama_paket: data.data.nama_paket,
            durasi_hari: data.data.durasi_hari,
            harga: data.data.harga,
            deskripsi: data.data.deskripsi,
          });
        } catch (err) {
          console.error(err);
          alert("Failed to fetch package data.");
        } finally {
          setLoading(false);
        }
      };
      fetchPaket();
    }
  }, [id]);

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
      const res = await fetch(
        id
          ? `http://localhost:3000/admin/paket-update/${id}`
          : `http://localhost:3000/admin/paket-tambah`,
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
        
      );
      const data = await res.json();
      console.log(form);
      if (res.ok) {
        alert(`Package ${id ? "updated" : "created"} successfully.`);
        navigate("/admin/packages");
      } else {
        alert(data.message || "Failed to submit package.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting package.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Edit Package" : "Add Package"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            Loading...
          </div>
        ) : (
          <>
            <Input
              placeholder="Package Name"
              name="nama_paket"
              value={form.nama_paket}
              onChange={handleChange}
            />
            <Input
              className="no-spinner"
              placeholder="Duration (days)"
              type="number"
              name="durasi_hari"
              value={form.durasi_hari === 0 ? "" : Number(form.durasi_hari)}
              onChange={handleChange}
            />
            <Input
              className="no-spinner"
              placeholder="Price"
              type="number"
              name="harga"
              value={form.harga === 0 ? "" : Number(form.harga)}
              onChange={handleChange}
            />
            <p className="text-sm ml-2">
              as rupiah:
              <span className="py-2 text-muted text-sm ml-2">
                Rp. {Number(form.harga).toLocaleString("id-ID")}
              </span>
            </p>
            <Input
              placeholder="Description"
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
            />
            <Button disabled={submitting} onClick={handleSubmit}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-1" />
                  Processing...
                </>
              ) : id ? (
                "Update Package"
              ) : (
                "Create Package"
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
