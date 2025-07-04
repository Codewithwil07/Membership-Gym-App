// src/pages/BebanOperasional.tsx

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface BebanOperasional {
  id: string;
  namaBeban: string;
  jumlahBeban: number;
  kategoriBeban: string;
  tanggalBeban: Date;
}

const ITEMS_PER_PAGE = 5;

const BebanOperasional: React.FC = () => {
  const [bebanList, setBebanList] = useState<BebanOperasional[]>([
    {
      id: "b001",
      namaBeban: "Sewa Gedung Jan",
      jumlahBeban: 5000000,
      kategoriBeban: "Sewa",
      tanggalBeban: new Date(2025, 0, 1),
    },
    {
      id: "b002",
      namaBeban: "Gaji Karyawan Jan",
      jumlahBeban: 15000000,
      kategoriBeban: "Gaji Karyawan",
      tanggalBeban: new Date(2025, 0, 31),
    },
    {
      id: "b003",
      namaBeban: "Tagihan Listrik Feb",
      jumlahBeban: 750000,
      kategoriBeban: "Listrik & Air",
      tanggalBeban: new Date(2025, 1, 15),
    },
    {
      id: "b004",
      namaBeban: "Perbaikan Treadmill",
      jumlahBeban: 1200000,
      kategoriBeban: "Perbaikan Alat",
      tanggalBeban: new Date(2025, 2, 10),
    },
    {
      id: "b005",
      namaBeban: "Iklan Instagram",
      jumlahBeban: 800000,
      kategoriBeban: "Marketing",
      tanggalBeban: new Date(2025, 3, 5),
    },
    {
      id: "b006",
      namaBeban: "Sewa Gedung Feb",
      jumlahBeban: 5000000,
      kategoriBeban: "Sewa",
      tanggalBeban: new Date(2025, 1, 1),
    },
    {
      id: "b007",
      namaBeban: "Gaji Karyawan Feb",
      jumlahBeban: 15000000,
      kategoriBeban: "Gaji Karyawan",
      tanggalBeban: new Date(2025, 1, 28),
    },
    {
      id: "b008",
      namaBeban: "Pembelian Sabun",
      jumlahBeban: 150000,
      kategoriBeban: "Kebersihan",
      tanggalBeban: new Date(2025, 2, 1),
    },
    {
      id: "b009",
      namaBeban: "Langganan Software",
      jumlahBeban: 300000,
      kategoriBeban: "Lain-lain",
      tanggalBeban: new Date(2025, 3, 1),
    },
    {
      id: "b010",
      namaBeban: "Promosi Lebaran",
      jumlahBeban: 1000000,
      kategoriBeban: "Marketing",
      tanggalBeban: new Date(2025, 3, 15),
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bebanList.length / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBebanDisplayed = bebanList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentBeban, setCurrentBeban] = useState<BebanOperasional | null>(
    null
  );

  const [formData, setFormData] = useState({
    namaBeban: "",
    jumlahBeban: "",
    kategoriBeban: "",
    tanggalBeban: new Date(),
  });
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const kategoriOptions = [
    "Sewa",
    "Gaji Karyawan",
    "Listrik & Air",
    "Internet",
    "Perbaikan Alat",
    "Kebersihan",
    "Marketing",
    "Lain-lain",
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const resetForm = () => {
    setFormData({
      namaBeban: "",
      jumlahBeban: "",
      kategoriBeban: "",
      tanggalBeban: new Date(),
    });
    setFormErrorMessage("");
    setCurrentBeban(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, kategoriBeban: value }));
  };

  const handleDateChange = (date?: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      tanggalBeban: date || new Date(),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMessage("");

    if (
      !formData.namaBeban ||
      !formData.jumlahBeban ||
      !formData.kategoriBeban ||
      !formData.tanggalBeban
    ) {
      setFormErrorMessage("Mohon lengkapi semua data.");
      return;
    }
    const jumlah = parseFloat(formData.jumlahBeban);
    if (isNaN(jumlah) || jumlah <= 0) {
      setFormErrorMessage("Jumlah Beban harus angka positif.");
      return;
    }

    if (currentBeban) {
      setBebanList(
        bebanList.map((beban) =>
          beban.id === currentBeban.id
            ? { ...formData, id: currentBeban.id, jumlahBeban: jumlah }
            : beban
        )
      );
      alert("Beban operasional berhasil diperbarui!");
    } else {
      const newId = `b${Date.now()}`; // Gunakan Date.now() untuk ID unik yang lebih baik
      setBebanList([
        ...bebanList,
        { ...formData, id: newId, jumlahBeban: jumlah },
      ]);
      alert("Beban operasional berhasil ditambahkan!");
    }
    setIsFormDialogOpen(false);
    resetForm();
  };

  const handleAddClick = () => {
    resetForm();
    setIsFormDialogOpen(true);
  };

  const handleEditClick = (beban: BebanOperasional) => {
    setCurrentBeban(beban);
    setFormData({
      namaBeban: beban.namaBeban,
      jumlahBeban: String(beban.jumlahBeban),
      kategoriBeban: beban.kategoriBeban,
      tanggalBeban: beban.tanggalBeban,
    });
    setIsFormDialogOpen(true);
  };

  const handleDeleteConfirm = (idToDelete: string) => {
    setBebanList(bebanList.filter((beban) => beban.id !== idToDelete));
    alert("Beban operasional berhasil dihapus!");
    if (
      currentPage > 1 &&
      currentBebanDisplayed.length === 1 &&
      bebanList.length === indexOfFirstItem + 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-spotify-dark-bg p-4 md:p-6 relative overflow-hidden">
      {/* Background Pattern/Gradient Subtle */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/black-linen.png")',
          backgroundSize: "300px",
          zIndex: 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-spotify-green/5 to-transparent opacity-10 blur-xl"></div>

      <Card className="w-full max-w-4xl mx-auto bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-2xl p-6 md:p-8 relative z-10 animate-fade-in-up">
        <CardHeader className="mb-6">
          <CardTitle className="text-3xl font-bold text-spotify-text-white mb-2">
            Manajemen{" "}
            <span className="text-spotify-green">Beban Operasional</span>
          </CardTitle>
          <CardDescription className="text-spotify-text-light-grey text-base">
            Kelola data pengeluaran gym Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleAddClick}
                  className="bg-spotify-green text-spotify-black hover:bg-opacity-90"
                >
                  <PlusCircle size={18} className="mr-2" /> Tambah Beban Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-spotify-card-bg border-spotify-border text-spotify-text-white rounded-lg">
                <DialogHeader>
                  <DialogTitle>
                    {currentBeban
                      ? "Edit Beban Operasional"
                      : "Tambah Beban Operasional"}
                  </DialogTitle>
                  <DialogDescription className="text-spotify-text-light-grey">
                    {currentBeban
                      ? "Ubah detail beban ini."
                      : "Isi detail beban operasional baru."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="namaBeban"
                      className="text-spotify-text-white"
                    >
                      Nama Beban
                    </Label>
                    <Input
                      id="namaBeban"
                      value={formData.namaBeban}
                      onChange={handleInputChange}
                      className="bg-spotify-light-card-bg border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="jumlahBeban"
                      className="text-spotify-text-white"
                    >
                      Jumlah Beban (Rp)
                    </Label>
                    <Input
                      id="jumlahBeban"
                      type="number"
                      value={formData.jumlahBeban}
                      onChange={handleInputChange}
                      min="0"
                      step="any"
                      className="bg-spotify-light-card-bg border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="kategoriBeban"
                      className="text-spotify-text-white"
                    >
                      Kategori Beban
                    </Label>
                    <Select
                      onValueChange={handleSelectChange}
                      value={formData.kategoriBeban}
                    >
                      <SelectTrigger className="w-full bg-spotify-light-card-bg border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent className="bg-spotify-light-card-bg border-spotify-border text-spotify-text-white">
                        {kategoriOptions.map((kategori) => (
                          <SelectItem key={kategori} value={kategori}>
                            {kategori}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="tanggalBeban"
                      className="text-spotify-text-white"
                    >
                      Tanggal Beban
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal bg-spotify-light-card-bg border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green ${
                            !formData.tanggalBeban &&
                            "text-spotify-placeholder-grey"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-spotify-text-light-grey" />
                          {formData.tanggalBeban ? (
                            format(formData.tanggalBeban, "dd MMMMyyyy", {
                              locale: idLocale,
                            })
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-spotify-card-bg border-spotify-border text-spotify-text-white">
                        <Calendar
                          mode="single"
                          selected={formData.tanggalBeban}
                          onSelect={handleDateChange}
                          initialFocus
                          locale={idLocale}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {formErrorMessage && (
                    <p className="text-red-500 text-sm">{formErrorMessage}</p>
                  )}
                  <DialogFooter className="pt-4">
                    <Button
                      type="submit"
                      className="bg-spotify-green text-spotify-black hover:bg-opacity-90"
                    >
                      {currentBeban ? "Simpan Perubahan" : "Tambah Beban"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto rounded-md border border-spotify-border">
            <Table className="w-full">
              <TableHeader className="bg-spotify-light-card-bg">
                <TableRow>
                  <TableHead className="text-spotify-text-light-grey">
                    Nama Beban
                  </TableHead>
                  <TableHead className="text-spotify-text-light-grey">
                    Jumlah
                  </TableHead>
                  <TableHead className="text-spotify-text-light-grey">
                    Kategori
                  </TableHead>
                  <TableHead className="text-spotify-text-light-grey">
                    Tanggal
                  </TableHead>
                  <TableHead className="text-spotify-text-light-grey text-center">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBebanDisplayed.length === 0 ? (
                  <TableRow>
                    {" "}
                    {/* Hapus whitespace */}
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-spotify-text-light-grey"
                    >
                      {bebanList.length === 0
                        ? "Tidak ada data beban operasional."
                        : "Tidak ada data di halaman ini."}
                    </TableCell>
                  </TableRow>
                ) : (
                  currentBebanDisplayed.map((beban) => (
                    <TableRow
                      key={beban.id}
                      className="border-spotify-border hover:bg-spotify-light-card-bg"
                    >
                      <TableCell className="font-medium text-spotify-text-white">
                        {beban.namaBeban}
                      </TableCell>
                      <TableCell className="text-spotify-text-white">
                        {formatRupiah(beban.jumlahBeban)}
                      </TableCell>
                      <TableCell className="text-spotify-text-light-grey">
                        {beban.kategoriBeban}
                      </TableCell>
                      <TableCell className="text-spotify-text-light-grey">
                        {format(beban.tanggalBeban, "dd MMMMyyyy", {
                          locale: idLocale,
                        })}
                      </TableCell>
                      <TableCell className="text-center space-x-2 flex justify-center items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(beban)}
                          className="text-spotify-text-light-grey hover:text-spotify-green hover:bg-transparent"
                        >
                          <Edit size={18} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-400 hover:bg-transparent"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-spotify-card-bg border-spotify-border text-spotify-text-white rounded-lg">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Apakah Anda yakin?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-spotify-text-light-grey">
                                Tindakan ini tidak dapat dibatalkan. Ini akan
                                menghapus beban "{beban.namaBeban}" secara
                                permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-700 text-spotify-text-white hover:bg-gray-600 border-none">
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteConfirm(beban.id)}
                                className="bg-red-500 text-spotify-text-white hover:bg-red-600"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-6">
          <p className="text-spotify-text-light-grey text-sm">
            Total {bebanList.length} beban tercatat.
          </p>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "text-spotify-text-dark-grey"
                      : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                  }
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                        className={
                          page === currentPage
                            ? "bg-spotify-green text-spotify-black hover:bg-spotify-green"
                            : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                        }
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "text-spotify-text-dark-grey"
                      : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                  }
                />
              </PaginationContent>
            </Pagination>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BebanOperasional;
