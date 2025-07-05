import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const PaymentResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<"success" | "failed" | "pending">(
    "pending"
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionStatus = queryParams.get("transaction_status");

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      setStatus("success");
    } else if (transactionStatus === "pending") {
      setStatus("pending");
    } else {
      setStatus("failed");
    }
  }, [location.search]);

  const handleBack = () => {
    navigate("/dashboard"); // ganti sesuai route dashboard kamu
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
      <div className="bg-spotify-card-active border border-spotify-light-border rounded-2xl p-8 max-w-md w-full text-center space-y-4">
        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-white text-2xl font-bold">
              Pembayaran Berhasil 🎉
            </h1>
            <p className="text-spotify-light-text">
              Terima kasih, membership kamu akan segera aktif.
            </p>
          </>
        )}

        {status === "pending" && (
          <>
            <Clock className="w-16 h-16 text-yellow-400 mx-auto" />
            <h1 className="text-white text-2xl font-bold">
              Menunggu Pembayaran
            </h1>
            <p className="text-spotify-light-text">
              Transaksi sedang menunggu pembayaran atau konfirmasi.
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-white text-2xl font-bold">
              Pembayaran Gagal ❌
            </h1>
            <p className="text-spotify-light-text">
              Transaksi gagal atau dibatalkan. Silakan coba lagi.
            </p>
          </>
        )}

        <Button
          onClick={handleBack}
          className="w-full bg-spotify-green text-black font-bold hover:bg-spotify-green/90 mt-4"
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentResultPage;
