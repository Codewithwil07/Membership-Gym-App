import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PackageData {
  id: number;
  nama_paket: string;
  deskripsi: string;
  durasi_hari: number;
  harga: string;
}

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [payLoading, setPayLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/paket/${id}`, {
          withCredentials: true,
        });
        setPkg(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail paket.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const handlePayment = async () => {
    if (!pkg) return;
    setPayLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/payment/create",
        {
          paket_id: pkg.id,
          payment_type: "dana", // atau dynamic
        },
        { withCredentials: true }
      );

      const { token } = res.data.data; // <- pastikan ambil dari data.data

      if (!window.snap) {
        toast({
          variant: "destructive",
          title: "Midtrans belum terload",
          description: "Coba refresh halaman dan ulangi pembayaran.",
        });
        return;
      }

      window.snap.pay(token, {
        onSuccess: () => {
          toast({
            title: "Pembayaran berhasil",
            description: "Terima kasih telah melakukan pembayaran.",
          });
          navigate("/payment/history");
        },
        onPending: () => {
          toast({
            title: "Pembayaran pending",
            description: "Pembayaran Anda sedang diproses.",
          });
          navigate("/payment/history");
        },
        onError: (error) => {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Pembayaran gagal",
            description: "Silakan coba lagi atau hubungi admin.",
          });
        },
        onClose: () => {
          toast({
            title: "Payment dibatalkan",
            description: "Anda menutup pembayaran sebelum selesai.",
          });
        },
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Gagal memulai pembayaran",
        description: "Silakan coba lagi atau hubungi admin.",
      });
    } finally {
      setPayLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin text-spotify-green w-10 h-10" />
      </div>
    );

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!pkg) return null;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card className="bg-spotify-card-active border border-spotify-light-border">
        <CardHeader>
          <CardTitle className="text-white">{pkg.nama_paket}</CardTitle>
          <p className="text-spotify-dimmed text-sm">{pkg.deskripsi}</p>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-white mb-4">
            Rp {parseInt(pkg.harga).toLocaleString("id-ID")}
          </p>
          <p className="text-spotify-light-text text-sm">
            Masa aktif {pkg.durasi_hari} hari dengan akses semua alat dan
            benefit sesuai paket.
          </p>
          <Button
            onClick={handlePayment}
            disabled={payLoading}
            className="w-full bg-spotify-green text-black font-bold hover:bg-spotify-green/90 mt-6"
          >
            {payLoading ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
