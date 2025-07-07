import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { Loader2, BadgeCheck, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/api/axios";

interface PaymentHistoryItem {
  id: number;
  order_id: string;
  nama_paket: string;
  jumlah_bayar: string;
  status: string;
  metode_pembayaran: string;
  created_at: string;
}

const PaymentHistoryPage: React.FC = () => {
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(
          "/api/payment/history",
          { withCredentials: true }
        );
        setHistory(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat riwayat pembayaran.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin text-spotify-green w-10 h-10" />
      </div>
    );

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Riwayat <span className="text-spotify-green">Pembayaran</span>
        </h1>
        <p className="text-spotify-dimmed mt-2">
          Lihat riwayat transaksi pembayaran paket membership Anda.
        </p>
      </div>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <Card
              key={item.id}
              className="hover:scale-[1.01] transition-transform duration-300 ease-in-out bg-spotify-card-active border border-spotify-light-border"
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  {item.nama_paket}
                  {item.status === "paid" && (
                    <Badge className="bg-spotify-green text-black font-bold">
                      <BadgeCheck className="w-4 h-4 mr-1" /> Lunas
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-spotify-dimmed text-sm mt-1">
                  {format(new Date(item.created_at), "dd MMM yyyy, HH:mm")}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-4xl font-bold text-white">
                  Rp {parseInt(item.jumlah_bayar).toLocaleString("id-ID")}
                </p>
                <div className="flex flex-col space-y-1 text-spotify-dimmed text-sm">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="text-spotify-light-text">
                      {item.order_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Metode:</span>
                    <span className="capitalize text-spotify-light-text">
                      {item.metode_pembayaran}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={`${
                        item.status === "paid"
                          ? "text-spotify-green"
                          : "text-yellow-400"
                      } font-semibold`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 space-y-4">
          <Receipt className="w-16 h-16 text-spotify-green" />
          <p className="text-white text-lg font-semibold">
            Belum ada riwayat pembayaran
          </p>
          <p className="text-spotify-dimmed text-sm text-center max-w-xs">
            Setelah Anda melakukan pembayaran paket membership, riwayat
            pembayaran akan muncul di sini.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
