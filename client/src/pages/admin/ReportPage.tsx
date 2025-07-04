// src/pages/ReportPage.tsx

import { useState, useEffect } from "react"; // Tambah useEffect
import ReportFilter from "@/components/admin/ReportFilter";
import ReportTable from "@/components/admin/ReportTable"; // Diasumsikan untuk pemasukan
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Tambah Card
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Tambah Table components
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

// Interface untuk Beban Operasional (sesuai ERD)
interface BebanOperasional {
  id: string;
  namaBeban: string;
  jumlahBeban: number;
  kategoriBeban: string;
  tanggalBeban: Date;
}

// Interface untuk Pemasukan (dummy untuk contoh)
interface Pemasukan {
  id: string;
  namaPemasukan: string; // Misal: Penjualan Paket Premium Bulanan
  jumlahPemasukan: number;
  tanggalPemasukan: Date;
}

export default function ReportPage() {
  const [filters, setFilters] = useState<{ mode: string; date: string }>({
    mode: "month", // Default filter mode
    date: format(new Date(), 'yyyy-MM'), // Default current month
  });

  // --- DATA DUMMY ---
  const dummyBebanOperasional: BebanOperasional[] = [
    { id: 'bo001', namaBeban: 'Sewa Gedung', jumlahBeban: 5000000, kategoriBeban: 'Sewa', tanggalBeban: new Date('2025-06-01') },
    { id: 'bo002', namaBeban: 'Gaji Karyawan', jumlahBeban: 15000000, kategoriBeban: 'Gaji Karyawan', tanggalBeban: new Date('2025-06-30') },
    { id: 'bo003', namaBeban: 'Listrik & Air', jumlahBeban: 750000, kategoriBeban: 'Listrik & Air', tanggalBeban: new Date('2025-06-15') },
    { id: 'bo004', namaBeban: 'Perbaikan Alat', jumlahBeban: 1200000, kategoriBeban: 'Perbaikan Alat', tanggalBeban: new Date('2025-05-20') },
    { id: 'bo005', namaBeban: 'Iklan Digital', jumlahBeban: 800000, kategoriBeban: 'Marketing', tanggalBeban: new Date('2025-06-10') },
  ];

  const dummyPemasukan: Pemasukan[] = [
    { id: 'pm001', namaPemasukan: 'Paket Premium Bulanan', jumlahPemasukan: 499000, tanggalPemasukan: new Date('2025-06-05') },
    { id: 'pm002', namaPemasukan: 'Paket Gold 3 Bulan', jumlahPemasukan: 900000, tanggalPemasukan: new Date('2025-06-12') },
    { id: 'pm003', namaPemasukan: 'Paket Elite Tahunan', jumlahPemasukan: 3000000, tanggalPemasukan: new Date('2025-06-18') },
    { id: 'pm004', namaPemasukan: 'Penjualan Merchandise', jumlahPemasukan: 250000, tanggalPemasukan: new Date('2025-05-25') },
    { id: 'pm005', namaPemasukan: 'Paket Premium Bulanan', jumlahPemasukan: 499000, tanggalPemasukan: new Date('2025-06-22') },
  ];
  // --- AKHIR DATA DUMMY ---

  const [filteredPemasukan, setFilteredPemasukan] = useState<Pemasukan[]>([]);
  const [filteredBeban, setFilteredBeban] = useState<BebanOperasional[]>([]);

  useEffect(() => {
    // Logika filtering dummy
    // Dalam aplikasi nyata, Anda akan melakukan panggilan API ke backend
    // dengan filter yang diberikan (mode dan date)
    const filterData = (data: any[], dateKey: string) => {
      if (!filters.date) return data;

      const filterDate = new Date(filters.date); // 'yyyy-MM' -> YYYY-MM-01
      const startOfMonthFilter = new Date(filterDate.getFullYear(), filterDate.getMonth(), 1);
      const endOfMonthFilter = new Date(filterDate.getFullYear(), filterDate.getMonth() + 1, 0); // Last day of month

      return data.filter(item => {
        const itemDate = new Date(item[dateKey]);
        return itemDate >= startOfMonthFilter && itemDate <= endOfMonthFilter;
      });
    };

    setFilteredPemasukan(filterData(dummyPemasukan, 'tanggalPemasukan'));
    setFilteredBeban(filterData(dummyBebanOperasional, 'tanggalBeban'));

  }, [filters]); // Re-run effect when filters change

  // Menghitung Total
  const totalPemasukan = filteredPemasukan.reduce((sum, item) => sum + item.jumlahPemasukan, 0);
  const totalBeban = filteredBeban.reduce((sum, item) => sum + item.jumlahBeban, 0);
  const netProfitLoss = totalPemasukan - totalBeban;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="p-4 space-y-6 bg-spotify-dark-bg text-spotify-text-white rounded-xl shadow-2xl md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-spotify-text-white">Laporan Keuangan</h1>
        <Button size="sm" className="bg-spotify-green text-spotify-black hover:bg-opacity-90" onClick={() => alert("Export PDF triggered!")}>
          Export PDF
        </Button>
      </div>

      {/* Filter Komponen */}
      <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
        <CardHeader><CardTitle className="text-xl">Filter Laporan</CardTitle></CardHeader>
        <CardContent><ReportFilter onFilterChange={setFilters} /></CardContent>
      </Card>

      {/* Ringkasan Total Keuangan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
          <CardHeader><CardTitle className="text-lg text-spotify-green">Total Pemasukan</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatRupiah(totalPemasukan)}</p></CardContent>
        </Card>
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
          <CardHeader><CardTitle className="text-lg text-red-500">Total Beban</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatRupiah(totalBeban)}</p></CardContent>
        </Card>
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
          <CardHeader><CardTitle className={`text-lg ${netProfitLoss >= 0 ? 'text-spotify-green' : 'text-red-500'}`}>Laba / Rugi Bersih</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatRupiah(netProfitLoss)}</p></CardContent>
        </Card>
      </div>

      {/* Tabel Pemasukan */}
      <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
        <CardHeader><CardTitle className="text-xl">Detail Pemasukan</CardTitle></CardHeader>
        <CardContent>
          {/* Asumsikan ReportTable akan merender tabel pemasukan */}
          <ReportTable filters={filters} data={filteredPemasukan} /> {/* Data pemasukan dikirimkan */}
        </CardContent>
      </Card>

      {/* Tabel Beban Operasional */}
      <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
        <CardHeader><CardTitle className="text-xl">Detail Beban Operasional</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border border-spotify-border">
            <Table>
              <TableHeader className="bg-spotify-light-card-bg">
                <TableRow>
                  <TableHead className="text-spotify-text-light-grey">Nama Beban</TableHead>
                  <TableHead className="text-spotify-text-light-grey">Jumlah</TableHead>
                  <TableHead className="text-spotify-text-light-grey">Kategori</TableHead>
                  <TableHead className="text-spotify-text-light-grey">Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBeban.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-spotify-text-light-grey">
                      Tidak ada data beban operasional untuk periode ini.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBeban.map((beban) => (
                    <TableRow key={beban.id} className="border-spotify-border hover:bg-spotify-light-card-bg">
                      <TableCell className="font-medium text-spotify-text-white">{beban.namaBeban}</TableCell>
                      <TableCell className="text-spotify-text-white">{formatRupiah(beban.jumlahBeban)}</TableCell>
                      <TableCell className="text-spotify-text-light-grey">{beban.kategoriBeban}</TableCell>
                      <TableCell className="text-spotify-text-light-grey">{format(beban.tanggalBeban, 'dd MMMMyyyy', { locale: idLocale })}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}