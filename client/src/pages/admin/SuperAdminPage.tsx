import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

interface Admin {
  id: number;
  username: string;
  email: string;
  no_hp: string;
  role: "admin";
  status_akun: "active" | "nonactive";
  foto: string | null;
}

export function SuperAdminAdminPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    no_hp: "",
  });

  const { toast } = useToast();
  const limit = 10;

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/admin/user-data?page=${page}&limit=${limit}&search=${search}`,
        { withCredentials: true }
      );
      const onlyAdmins = res.data.data.data.filter(
        (user: Admin) => user.role === "admin" && user.id !== 1 
      );
      setAdmins(onlyAdmins);
      setTotalPages(res.data.data.pagination.totalPage);
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to fetch admin data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSubmit = async () => {
    try {
      if (editingAdmin) {
        await api.put(
          `/admin/update-admin/${editingAdmin.id}`,
          form,
          { withCredentials: true }
        );
        toast({ title: "Admin updated successfully." });
      } else {
        await api.post(
          "/admin/user-tambah",
          {
            ...form,
            role: "admin",
            status_akun: "active",
          },
          { withCredentials: true }
        );
        toast({ title: "Admin added successfully." });
      }
      setOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to submit.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/admin/user-hapus/${id}`, {
        withCredentials: true,
      });
      toast({ title: "Admin deleted successfully." });
      fetchAdmins();
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to delete admin.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-xl font-semibold">Admin Management</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Search admin..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-64"
          />
          <Dialog
            open={open}
            onOpenChange={(o) => {
              if (!o) {
                setEditingAdmin(null);
                setForm({ username: "", email: "", password: "", no_hp: "" });
              }
              setOpen(o);
            }}
          >
            <DialogTrigger asChild>
              <Button>Add Admin</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingAdmin ? "Edit Admin" : "Add Admin"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <Input
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="password-toggle-icon"
                />
                <Input
                  placeholder="Phone Number"
                  value={form.no_hp}
                  onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                />
                <Button onClick={handleSubmit} className="w-full">
                  {editingAdmin ? "Update Admin" : "Create Admin"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={admin.foto ?? ""} />
                  <AvatarFallback className="bg-spotify-green text-black">
                    {admin.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{admin.username}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.no_hp}</TableCell>
              <TableCell>{admin.status_akun}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    admin.status_akun === "active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {admin.status_akun}
                </span>
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingAdmin(admin);
                    setForm({
                      username: admin.username,
                      email: admin.email,
                      no_hp: admin.no_hp,
                    });
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
