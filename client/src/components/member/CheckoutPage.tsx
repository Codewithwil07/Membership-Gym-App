// src/pages/CheckoutPage.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Banknote, QrCode as QrCodeIcon, Info } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const staticSelectedPackage = {
    id: 'premium-monthly',
    name: 'Premium Bulanan',
    durationDays: 30,
    price: 499000,
    benefits: [
      'Akses gym 24/7',
      'Locker pribadi',
      'Personal trainer 2x/bulan',
      'Konsultasi nutrisi',
      'Akses kelas grup',
      'Protein shake gratis',
    ],
  };

  const staticPaymentMethods = [
    { id: 'bank-transfer', name: 'Transfer Bank (BCA, Mandiri, dll.)', icon: Banknote, description: 'Pembayaran manual via transfer antar bank.' },
    { id: 'e-wallet', name: 'E-Wallet (Gopay, OVO, Dana)', icon: QrCodeIcon, description: 'Pembayaran instan via aplikasi e-wallet favorit Anda.' },
    { id: 'credit-card', name: 'Kartu Kredit / Debit', icon: CreditCard, description: 'Pembayaran instan dan aman dengan kartu kredit/debit.' },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu.');
      return;
    }

    setLoadingPayment(true);

    try {
      await loadSnap(); // memastikan snap.js terload

      const response = await fetch('/api/payment/create-transaction', { // endpoint backend kamu
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: staticSelectedPackage.id,
          amount: staticSelectedPackage.price,
          paymentMethod: selectedPaymentMethod,
        }),
      });

      const data = await response.json();

      if (data.snapToken) {
        window.snap.pay(data.snapToken, {
          onSuccess: () => console.log('Payment Success'),
          onPending: () => console.log('Payment Pending'),
          onError: () => console.log('Payment Failed'),
          onClose: () => console.log('Payment Popup Closed'),
        });
      } else {
        alert('Gagal mendapatkan token pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memproses pembayaran.');
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white text-center">
          Checkout <span className="text-spotify-green">Paket Membership</span>
        </h1>
        <p className="text-spotify-text-light-grey text-center mb-8">
          Konfirmasi pesanan Anda dan pilih metode pembayaran.
        </p>

        {/* Ringkasan Paket */}
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Ringkasan Pesanan</CardTitle>
            <CardDescription className="text-spotify-text-light-grey text-sm">
              Pastikan detail paket sudah sesuai.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">{staticSelectedPackage.name}</span>
              <span>{staticSelectedPackage.durationDays} hari</span>
            </div>
            <ul className="text-spotify-text-light-grey text-sm list-disc list-inside">
              {staticSelectedPackage.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
            <div className="border-t border-spotify-border pt-3">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-spotify-green font-bold text-xl">{formatRupiah(staticSelectedPackage.price)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pilih Metode Pembayaran */}
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Pilih Metode Pembayaran</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedPaymentMethod}
              onValueChange={setSelectedPaymentMethod}
              className="space-y-3"
            >
              {staticPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-spotify-light-card-bg transition cursor-pointer"
                >
                  <RadioGroupItem value={method.id} id={method.id} className="text-spotify-green" />
                  <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer">
                    <method.icon size={24} className="text-spotify-green flex-shrink-0" />
                    <div>
                      <p>{method.name}</p>
                      <p className="text-spotify-text-light-grey text-sm">{method.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handlePayment}
              disabled={loadingPayment}
              className="w-full bg-spotify-green text-spotify-black font-bold py-2 rounded-full hover:bg-opacity-90 transition"
            >
              {loadingPayment ? 'Memproses...' : 'Lanjutkan Pembayaran'}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-start gap-3 p-4 bg-spotify-light-card-bg rounded-lg text-spotify-text-light-grey text-sm">
          <Info size={20} className="text-spotify-green mt-0.5" />
          <span>Pastikan Anda memiliki koneksi internet yang stabil saat melakukan pembayaran.</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
