import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface AbsensiFormProps {
  initialData?: {
    user_id: number;
    tanggal_absen: string;
    waktu_absen: string;
    metode: string;
    catatan: string;
  };
  onSubmit: (data: any) => void;
  className?: string; // tambahkan optional className
}

export default function AbsensiForm({
  initialData,
  onSubmit,
  className,
}: AbsensiFormProps) {
  const [form, setForm] = useState({
    user_id: initialData?.user_id || 0,
    tanggal_absen: initialData?.tanggal_absen || "",
    waktu_absen: initialData?.waktu_absen || "",
    metode: initialData?.metode || "",
    catatan: initialData?.catatan || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Attendance" : "Add Attendance"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          placeholder="User ID"
          type="number"
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
        />
        <Input
          placeholder="Date"
          type="date"
          name="tanggal_absen"
          value={form.tanggal_absen}
          onChange={handleChange}
        />
        <Input
          placeholder="Time"
          type="time"
          name="waktu_absen"
          value={form.waktu_absen}
          onChange={handleChange}
        />
        <Input
          placeholder="Method"
          name="metode"
          value={form.metode}
          onChange={handleChange}
        />
        <Input
          placeholder="Note"
          name="catatan"
          value={form.catatan}
          onChange={handleChange}
        />

        <div className="flex justify-between flex-row-reverse">
          <Button onClick={() => onSubmit(form)}>
            {initialData ? "Update" : "Create"}
          </Button>
          <Button variant="destructive">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
