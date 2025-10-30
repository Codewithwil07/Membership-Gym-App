// src/pages/ReportPage.tsx

import { useState, useEffect, useRef } from "react";
import ReportFilter from "@/components/admin/ReportFilter";
import ReportTable from "@/components/admin/ReportTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import api from "@/api/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface BebanOperasional {
  id: string | number;
  nama: string;
  jumlah: number;
  tanggal: Date;
  keterangan?: string;
}

interface Pemasukan {
  id: string | number;
  username: string;
  nama_paket: string;
  transaction_date: Date;
  metode_pembayaran: string;
  amount: number;
  status: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

const ITEMS_PER_PAGE_PEMASUKAN = 5;
const ITEMS_PER_PAGE_BEBAN = 5;

export default function ReportPage() {
  const [filters, setFilters] = useState<{ month: number; year: number }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [filteredPemasukan, setFilteredPemasukan] = useState<Pemasukan[]>([]);
  const [filteredBeban, setFilteredBeban] = useState<BebanOperasional[]>([]);

  const [pemasukanPage, setPemasukanPage] = useState(1);
  const [pemasukanMeta, setPemasukanMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE_PEMASUKAN,
  });

  const [bebanPage, setBebanPage] = useState(1);
  const [bebanMeta, setBebanMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE_BEBAN,
  });

  const [totalPemasukanApi, setTotalPemasukanApi] = useState<number>(0);
  const [totalBebanApi, setTotalBebanApi] = useState<number>(0);
  const [netProfitLossApi, setNetProfitLossApi] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);

    const monthFormatted =
      filters.month < 10 ? `0${filters.month}` : String(filters.month);
    const dateApiFormat = `${filters.year}-${monthFormatted}`;

    try {
      const response = await api.get("/api/transaksi/laporan-keuangan", {
        params: {
          month: dateApiFormat,
          page_pemasukan: pemasukanPage,
          limit_pemasukan: ITEMS_PER_PAGE_PEMASUKAN,
          page_pengeluaran: bebanPage,
          limit_pengeluaran: ITEMS_PER_PAGE_BEBAN,
        },
      });

      const responseData = response.data.data;

      setTotalPemasukanApi(parseFloat(responseData.total_pemasukan || "0"));
      setTotalBebanApi(parseFloat(responseData.total_beban || "0"));
      setNetProfitLossApi(responseData.laba_rugi || 0);

      const parsedPemasukan = responseData.detail_pemasukan.data.map(
        (item: any) => ({
          ...item,
          id: item.id || item.transaction_id,
          amount: parseFloat(item.amount),
          transaction_date: new Date(item.transaction_date),
        })
      );
      setFilteredPemasukan(parsedPemasukan);
      setPemasukanMeta({
        total: responseData.detail_pemasukan.total,
        page: responseData.detail_pemasukan.page,
        limit: responseData.detail_pemasukan.limit,
      });

      const parsedBeban = responseData.detail_beban.data.map((item: any) => ({
        ...item,
        jumlah: parseFloat(item.jumlah),
        tanggal: new Date(item.tanggal),
      }));
      setFilteredBeban(parsedBeban);
      setBebanMeta({
        total: responseData.detail_beban.total,
        page: responseData.detail_beban.page,
        limit: responseData.detail_beban.limit,
      });
    } catch (err: any) {
      console.error("Error fetching report data:", err);
      setError(err?.response?.data?.message || "Gagal mengambil data laporan.");
      setFilteredPemasukan([]);
      setFilteredBeban([]);
      setPemasukanMeta({ total: 0, page: 1, limit: ITEMS_PER_PAGE_PEMASUKAN });
      setBebanMeta({ total: 0, page: 1, limit: ITEMS_PER_PAGE_BEBAN });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [filters, pemasukanPage, bebanPage]);

  const totalPemasukan = totalPemasukanApi;
  const totalBeban = totalBebanApi;
  const netProfitLoss = netProfitLossApi;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getActualTotalPages = (totalItems: number, limit: number) => {
    return Math.ceil(totalItems / limit) || 1;
  };

  const exportRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = () => {
    const input = exportRef.current;
    if (!input) {
      console.error("Elemen untuk ekspor tidak ditemukan");
      return;
    }

    // Gunakan html2canvas untuk "menggambar" elemen menjadi canvas
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // p: portrait, mm: millimeters, a4: page size
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("laporan-anda.pdf");
    });
  };

  return (
    <main className="p-4 space-y-6 bg-spotify-dark-bg text-spotify-text-white rounded-xl shadow-2xl md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-spotify-text-white">
          Laporan Keuangan
        </h1>
        <Button
          size="sm"
          className="bg-spotify-green text-spotify-black hover:bg-opacity-90"
          onClick={handleExportPdf}
        >
          Export PDF
        </Button>
      </div>

      <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            Filter Laporan (Bulan & Tahun)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReportFilter onFilterChange={setFilters} />
        </CardContent>
      </Card>

      <div ref={exportRef} className="bg-[#121212] text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5">
          <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-spotify-green">
                Total Pemasukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatRupiah(totalPemasukan)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-red-500">
                Total Beban
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatRupiah(totalBeban)}</p>
            </CardContent>
          </Card>
          <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle
                className={`text-lg ${
                  netProfitLoss >= 0 ? "text-spotify-green" : "text-red-500"
                }`}
              >
                Laba / Rugi Bersih
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatRupiah(netProfitLoss)}
              </p>
            </CardContent>
          </Card>
        </div>

        {loading && (
          <p className="text-center text-spotify-text-light-grey">
            Mengambil data laporan...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Detail Pemasukan</CardTitle>
              </CardHeader>
              <CardContent>
                <ReportTable filters={filters} data={filteredPemasukan} />
                {getActualTotalPages(pemasukanMeta.total, pemasukanMeta.limit) >
                  1 && (
                  <div className="mt-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious
                          onClick={() => setPemasukanPage(pemasukanPage - 1)}
                          disabled={pemasukanPage === 1}
                          className={
                            pemasukanPage === 1
                              ? "text-spotify-text-dark-grey"
                              : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                          }
                        />
                        {Array.from(
                          {
                            length: getActualTotalPages(
                              pemasukanMeta.total,
                              pemasukanMeta.limit
                            ),
                          },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={`pemasukan-page-${page}`}>
                            <PaginationLink
                              onClick={() => setPemasukanPage(page)}
                              isActive={page === pemasukanPage}
                              className={
                                page === pemasukanPage
                                  ? "bg-spotify-green text-spotify-black hover:bg-spotify-green"
                                  : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationNext
                          onClick={() => setPemasukanPage(pemasukanPage + 1)}
                          disabled={
                            pemasukanPage ===
                            getActualTotalPages(
                              pemasukanMeta.total,
                              pemasukanMeta.limit
                            )
                          }
                          className={
                            pemasukanPage ===
                            getActualTotalPages(
                              pemasukanMeta.total,
                              pemasukanMeta.limit
                            )
                              ? "text-spotify-text-dark-grey"
                              : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                          }
                        />
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-spotify-card-bg border mt-5 border-spotify-border text-spotify-text-white rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">
                  Detail Beban Operasional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border border-spotify-border">
                  <Table>
                    <TableHeader className="bg-spotify-light-card-bg">
                      <TableRow>
                        <TableHead className="text-spotify-text-light-grey">
                          Nama Beban
                        </TableHead>
                        <TableHead className="text-spotify-text-light-grey">
                          Jumlah
                        </TableHead>
                        <TableHead className="text-spotify-text-light-grey">
                          Keterangan
                        </TableHead>
                        <TableHead className="text-spotify-text-light-grey">
                          Tanggal
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBeban.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="h-24 text-center text-spotify-text-light-grey"
                          >
                            Tidak ada data beban operasional untuk periode ini.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBeban.map((beban) => (
                          <TableRow
                            key={beban.id}
                            className="border-spotify-border hover:bg-spotify-light-card-bg"
                          >
                            <TableCell className="font-medium text-spotify-text-white">
                              {beban.nama}
                            </TableCell>
                            <TableCell className="text-spotify-text-white">
                              {formatRupiah(beban.jumlah)}
                            </TableCell>
                            <TableCell className="text-spotify-text-light-grey">
                              {beban.keterangan}
                            </TableCell>
                            <TableCell className="text-spotify-text-light-grey">
                              {format(beban.tanggal, "dd MMMMyyyy", {
                                locale: idLocale,
                              })}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                {getActualTotalPages(bebanMeta.total, bebanMeta.limit) > 1 && (
                  <div className="mt-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious
                          onClick={() => setBebanPage(bebanPage - 1)}
                          disabled={bebanPage === 1}
                          className={
                            bebanPage === 1
                              ? "text-spotify-text-dark-grey"
                              : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                          }
                        />
                        {Array.from(
                          {
                            length: getActualTotalPages(
                              bebanMeta.total,
                              bebanMeta.limit
                            ),
                          },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={`beban-page-${page}`}>
                            <PaginationLink
                              onClick={() => setBebanPage(page)}
                              isActive={page === bebanPage}
                              className={
                                page === bebanPage
                                  ? "bg-spotify-green text-spotify-black hover:bg-spotify-green"
                                  : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationNext
                          onClick={() => setBebanPage(bebanPage + 1)}
                          disabled={
                            bebanPage ===
                            getActualTotalPages(
                              bebanMeta.total,
                              bebanMeta.limit
                            )
                          }
                          className={
                            bebanPage ===
                            getActualTotalPages(
                              bebanMeta.total,
                              bebanMeta.limit
                            )
                              ? "text-spotify-text-dark-grey"
                              : "text-spotify-text-white hover:text-spotify-green hover:bg-transparent"
                          }
                        />
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}
