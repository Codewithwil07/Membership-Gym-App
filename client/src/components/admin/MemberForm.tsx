import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface MemberFormProps {
  initialData?: {
    username: string;
    email: string;
    no_hp: string;
    status_akun: string;
  };
  onSubmit: (data: any) => void;
}

export default function MemberForm({ initialData, onSubmit }: MemberFormProps) {
  const [form, setForm] = useState({
    username: initialData?.username || "",
    email: initialData?.email || "",
    no_hp: initialData?.no_hp || "",
    status_akun: initialData?.status_akun || "Aktif",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Member" : "Add Member"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone Number"
          name="no_hp"
          value={form.no_hp}
          onChange={handleChange}
        />
        <Input
          placeholder="Status (Aktif/Tidak Aktif)"
          name="status_akun"
          value={form.status_akun}
          onChange={handleChange}
        />
        <Button onClick={() => onSubmit(form)}>
          {initialData ? "Update" : "Create"}
        </Button>
      </CardContent>
    </Card>
  );
}
