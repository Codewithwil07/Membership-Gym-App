// src/pages/CheckoutPage.tsx

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, CreditCard, Banknote, QrCode as QrCodeIcon, Info } from 'lucide-react'; // Tambah Info icon

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data paket yang dipilih, diasumsikan dari `location.state`
  const selectedPackage = location.state?.selectedPackage || {
    id: 'default-package',
    name: 'Paket Tidak Ditemukan', // Fallback jika tidak ada data
    durationDays: 0,
    price: 0,
    benefits: [],
  };

  // State untuk metode pembayaran yang dipilih (sesuai ERD Transaksi.metode_pembayaran)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const paymentMethods = [
    { id: 'bank-transfer', name: 'Transfer Bank', icon: Banknote, description: 'Bayar melalui transfer antar bank.' },
    { id: 'e-wallet', name: 'E-Wallet', icon: QrCodeIcon, description: 'Bayar via Gopay, OVO, Dana, dll.' },
    { id: 'credit-card', name: 'Kartu Kredit / Debit', icon: CreditCard, description: 'Pembayaran instan dengan kartu Anda.' },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleProceedToPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Mohon pilih metode pembayaran terlebih dahulu.');
      return;
    }
    // Disini Anda akan mencatat Transaksi ke backend (dengan status pending)
    // dan kemudian mengarahkan ke halaman konfirmasi/instruksi pembayaran.
    console.log(`Melanjutkan checkout untuk ${selectedPackage.name} dengan metode ${selectedPaymentMethod}`);
    alert(`Anda akan diarahkan ke halaman instruksi pembayaran untuk ${selectedPaymentMethod}.`);

    // Contoh navigasi ke halaman instruksi pembayaran
    navigate('/payment-instructions', {
      state: {
        package: selectedPackage,
        method: selectedPaymentMethod,
        transactionId: 'TRX' + Date.now(), // ID Transaksi dummy
      }
    });
  };

  // Tampilkan pesan error jika tidak ada paket yang dipilih
  if (!selectedPackage.id || selectedPackage.id === 'default-package') {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-screen-md mx-auto text-center py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          Paket Tidak Ditemukan
        </h1>
        <p className="text-spotify-dimmed text-sm md:text-base mb-8">
          Mohon kembali ke halaman membership untuk memilih paket terlebih dahulu.
        </p>
        <Link to="/membership" className="px-6 py-3 bg-spotify-green text-white font-bold rounded-full hover:bg-opacity-90 transition-colors">
          Pilih Paket Membership
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6"> {/* Padding dan spasi yang ringkas, mobile-first */}
      {/* Kontainer Utama Halaman Checkout */}
      <div className="max-w-screen-md mx-auto space-y-6"> {/* Memusatkan konten di tengah layar */}
        {/* Header Halaman */}
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 text-center">
          Checkout <span className="text-spotify-green">Paket Membership</span>
        </h1>
        <p className className="text-spotify-dimmed text-sm md:text-base mb-8 text-center">
          Konfirmasi pesanan Anda dan pilih metode pembayaran.
        </p>

        {/* Ringkasan Paket Terpilih */}
        <Card className="bg-spotify-card-active border border-spotify-light-border text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Ringkasan Pesanan</CardTitle>
            <CardDescription className="text-spotify-dimmed text-sm">
              Pastikan detail paket sudah sesuai.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-spotify-light-text">
              <span className="text-lg font-semibold">{selectedPackage.name}</span>
              <span className="text-lg font-semibold">{selectedPackage.durationDays} hari</span>
            </div>
            {selectedPackage.benefits && selectedPackage.benefits.length > 0 && (
              <ul className="text-spotify-dimmed text-sm space-y-1 list-disc list-inside">
                {selectedPackage.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            )}
            <div className="border-t border-spotify-light-border pt-3 mt-3">
              <div className="flex justify-between items-center text-spotify-light-text text-xl font-bold">
                <span>Total Pembayaran</span>
                <span className="text-spotify-green">{formatRupiah(selectedPackage.price)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pilihan Metode Pembayaran */}
        <Card className="bg-spotify-card-active border border-spotify-light-border text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Metode Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup onValueChange={setSelectedPaymentMethod} value={selectedPaymentMethod} className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-spotify-card-hover transition-colors duration-200 cursor-pointer border border-transparent has-[[data-state=checked]]:border-spotify-green">
                  <RadioGroupItem value={method.id} id={method.id} className="text-spotify-green" />
                  <Label htmlFor={method.id} className="flex items-center gap-3 text-lg cursor-pointer flex-grow">
                    <method.icon size={24} className="text-spotify-green flex-shrink-0" />
                    <div className="flex flex-col text-left">
                      <span>{method.name}</span>
                      <span className="text-spotify-dimmed text-sm">{method.description}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              onClick={handleProceedToPayment}
              className="w-full bg-spotify-green text-black font-bold py-2 rounded-full hover:bg-opacity-90 transition-colors"
              disabled={!selectedPaymentMethod} // Tombol disable jika belum pilih metode
            >
              Lanjutkan Pembayaran
            </Button>
          </CardFooter>
        </Card>

        {/* Info Tambahan / Catatan */}
        <div className="flex items-start gap-3 p-4 bg-spotify-card-hover rounded-lg text-spotify-dimmed text-sm">
          <Info size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
          <span>
            Pembayaran akan diproses melalui gateway pembayaran yang terintegrasi. Pastikan Anda memiliki koneksi internet yang stabil.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;