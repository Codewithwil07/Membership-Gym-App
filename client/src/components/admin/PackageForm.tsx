import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface PaketFormProps {
  initialData?: {
    nama_paket: string;
    durasi_hari: number;
    harga: number;
    deskripsi: string;
  };
  onSubmit: (data: any) => void;
}

export default function PaketForm({ initialData, onSubmit }: PaketFormProps) {
  const [form, setForm] = useState({
    nama_paket: initialData?.nama_paket || "",
    durasi_hari: initialData?.durasi_hari || 0,
    harga: initialData?.harga || 0,
    deskripsi: initialData?.deskripsi || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Package" : "Add Package"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          placeholder="Package Name"
          name="nama_paket"
          value={form.nama_paket}
          onChange={handleChange}
        />
        <Input
          placeholder="Duration (days)"
          type="number"
          name="durasi_hari"
          value={form.durasi_hari}
          onChange={handleChange}
        />
        <Input
          placeholder="Price"
          type="number"
          name="harga"
          value={form.harga}
          onChange={handleChange}
        />
        <Input
          placeholder="Description"
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
        />
        <Button onClick={() => onSubmit(form)}>
          {initialData ? "Update" : "Create"}
        </Button>
      </CardContent>
    </Card>
  );
}
