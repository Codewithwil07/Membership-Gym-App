// src/pages/BebanOperasional.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";

interface BebanOperasional {
  id: number;
  nama: string;
  jumlah: number;
  keterangan: string;
  tanggal: string;
}

const BebanOperasionalPage = () => {
  const [data, setData] = useState<BebanOperasional[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    jumlah: "",
    keterangan: "-",
    tanggal: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/api/beban-operasional", {
      params: { limit, page, search },
      withCredentials: true,
    });
    setData(res.data.data.data);
    console.log(res.data.data);
    setTotalPages(res.data.data.total);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:3000/api/beban-operasional/${editId}`,
        form,
        { withCredentials: true }
      );
    } else {
      await axios.post("http://localhost:3000/api/beban-operasional", form, {
        withCredentials: true,
      });
    }
    setOpen(false);
    setForm({
      nama: "",
      jumlah: "",
      keterangan: "",
      tanggal: "",
    });
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/beban-operasional/${id}`, {
      withCredentials: true,
    });
    fetchData();
  };

  const handleEdit = (item: BebanOperasional) => {
    setForm({
      nama: item.nama,
      jumlah: String(item.jumlah),
      keterangan: item.keterangan,
      tanggal: item.tanggal,
    });
    setEditId(item.id);
    setOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Beban Operasional</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Tambah Beban</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={""}>
              <DialogHeader>
                <DialogTitle>
                  {editId ? "Edit" : "Tambah"} Beban Operasional
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <Label>Nama Beban</Label>
                <Input
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
                <Label>Jumlah Beban (Rp)</Label>
                <Input
                  className="no-spinner"
                  type="number"
                  value={form.jumlah}
                  onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
                />
                <Label>Keterangan (Opsional)</Label>
                <Input
                  type="text"
                  value={form.keterangan}
                  onChange={(e) =>
                    setForm({ ...form, keterangan: e.target.value })
                  }
                />
                <Label>Tanggal Beban</Label>
                <Input
                  type="date"
                  value={form.tanggal}
                  onChange={(e) =>
                    setForm({ ...form, tanggal: e.target.value })
                  }
                />
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>
                  {editId ? "Update" : "Tambah"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Beban</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>keterangan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => {
              const formatedDate = format(item.tanggal, "dd-MM-yyyy");
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>
                    Rp. {item.jumlah.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{item.keterangan}</TableCell>
                  <TableCell>{formatedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(item)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => setPage(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            />
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default BebanOperasionalPage;
