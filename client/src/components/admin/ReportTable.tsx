// src/components/admin/ReportTable.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import Shadcn Table components
import { format } from "date-fns"; // Untuk format tanggal
import { id as idLocale } from "date-fns/locale"; // Untuk lokal bahasa Indonesia

// --- UPDATE INTERFACE AGAR SESUAI DENGAN INTERFACE PEMASUKAN DARI API ---
interface PemasukanItem { // Ubah nama interface dari Report menjadi PemasukanItem agar tidak bentrok
  id: string | number;
  username: string;
  nama_paket: string;
  transaction_date: Date; // Ini akan menjadi objek Date karena sudah diparse di ReportPage
  metode_pembayaran: string;
  amount: number; // Ini akan menjadi number karena sudah diparse di ReportPage
  status: string;
}
// --- AKHIR UPDATE INTERFACE ---

// --- UPDATE PROPS AGAR MENERIMA DATA DARI PARENT ---
export default function ReportTable({
  filters, // Filters masih bisa diterima jika ada tampilan/logika khusus berdasarkan filter, tapi tidak lagi digunakan untuk filtering data
  data, // <<-- Data pemasukan yang sudah difilter dan dipaginasi dari ReportPage
}: {
  filters: { month: number; year: number; }; // Sesuaikan dengan tipe filter baru
  data: PemasukanItem[]; // Tipe data yang diterima
}) {

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto rounded-md border border-spotify-border"> {/* Wrapper untuk scroll horizontal & border */}
      <Table className="w-full">
        <TableHeader className="bg-spotify-light-card-bg">
          <TableRow>
            <TableHead className="text-spotify-text-light-grey">User</TableHead>
            <TableHead className="text-spotify-text-light-grey">Paket</TableHead>
            <TableHead className="text-spotify-text-light-grey">Tgl. Transaksi</TableHead>
            <TableHead className="text-spotify-text-light-grey">Metode Bayar</TableHead>
            <TableHead className="text-spotify-text-light-grey text-right">Jumlah</TableHead> 
            <TableHead className="text-spotify-text-light-grey text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-spotify-text-light-grey">
                Tidak ada data pemasukan untuk periode ini.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.transaction_date} className="border-spotify-border hover:bg-spotify-light-card-bg">
                <TableCell className="font-medium text-spotify-text-white">{item.username}</TableCell>
                <TableCell className="text-spotify-text-white">{item.nama_paket}</TableCell>
                {/* Pastikan transaction_date adalah objek Date */}
                <TableCell className="text-spotify-text-light-grey">{format(item.transaction_date, 'dd MMMMyyyy', { locale: idLocale })}</TableCell>
                <TableCell className="text-spotify-text-light-grey">{item.metode_pembayaran}</TableCell>
                <TableCell className="text-spotify-text-white text-right">{formatRupiah(item.amount)}</TableCell> 
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === "sukses" || item.status === "settlement" || item.status === "capture"
                        ? "bg-spotify-green text-spotify-black" // Status sukses/paid
                        : item.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-500" // Status pending
                        : "bg-red-500/20 text-red-500" // Status gagal/lainnya
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}