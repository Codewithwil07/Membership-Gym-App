// src/pages/PromoDetailPage.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Hanya untuk tombol kembali, tidak ada useParams
import { Button } from '@/components/ui/button'; // Menggunakan Shadcn Button
import { ChevronLeft } from 'lucide-react'; // Icon untuk tombol kembali

const PromoDetailPage: React.FC = () => {
  // Data dummy statis untuk keperluan UI (tidak diambil dari URL atau API)
  const staticPromo = {
    id: '1', // ID ini tidak digunakan untuk logika, hanya sebagai identifikasi dummy
    title: 'Diskon Spesial Paket Membership Tahunan!',
    image: 'https://via.placeholder.com/1200x400/FFD700/000000?text=Diskon+Membership+Tahunan',
    description: 'Dapatkan penawaran terbatas untuk paket membership tahunan kami! Hemat lebih banyak dan nikmati semua fasilitas premium GymFlow selama setahun penuh. Jangan lewatkan kesempatan emas ini untuk berinvestasi pada kesehatan dan kebugaran Anda. Penawaran ini dirancang khusus untuk Anda yang berkomitmen pada gaya hidup sehat jangka panjang.',
    details: [
      'Diskon 25% untuk semua paket membership tahunan (Premium & Elite).',
      'Bonus 1 sesi konsultasi gratis dengan personal trainer bersertifikat.',
      'Akses eksklusif ke kelas-kelas spesial dan workshop bulanan.',
      'Gratis merchandise eksklusif GymFlow (t-shirt atau shaker).',
      'Prioritas pendaftaran untuk event-event khusus gym.',
    ],
    terms: 'Promo ini berlaku dari tanggal 15 Juli 2024 hingga 31 Agustus 2024. Hanya berlaku untuk pendaftaran membership tahunan baru dan tidak dapat digabungkan dengan promo lainnya. Syarat dan ketentuan lengkap berlaku dan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Silakan hubungi customer service kami untuk informasi lebih lanjut atau klarifikasi mengenai detail promo ini sebelum melakukan pembelian.',
  };

  return (
    <div className="p-4 md:p-6 space-y-6"> {/* Padding dan spasi halaman */}
      <div className="max-w-screen-lg mx-auto bg-spotify-card-bg rounded-xl shadow-2xl p-4 space-y-6 md:p-6 md:space-y-8"> {/* Kontainer utama detail promo */}
        {/* Tombol Kembali */}
        <Link to="/promo" className="inline-flex items-center text-spotify-text-light-grey hover:text-spotify-text-white transition-colors text-sm font-semibold mb-4">
          <ChevronLeft size={20} className="mr-1" /> Kembali ke Daftar Promo
        </Link>

        {/* Gambar Promo */}
        <img
          src={staticPromo.image}
          alt={staticPromo.title}
          className="w-full h-auto rounded-lg object-cover mb-6 shadow-md"
          style={{ maxHeight: '500px' }}
        />

        {/* Judul & Deskripsi */}
        <h1 className="text-3xl md:text-4xl font-bold text-spotify-text-white mb-3">
          {staticPromo.title}
        </h1>
        <p className="text-spotify-text-light-grey text-base leading-relaxed mb-6">
          {staticPromo.description}
        </p>

        {/* Detail/Manfaat Promo */}
        {staticPromo.details && staticPromo.details.length > 0 && (
          <div className="bg-spotify-light-card-bg rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-spotify-text-white mb-3">Apa yang Anda Dapatkan?</h2>
            <ul className="space-y-3 text-spotify-text-light-grey text-base list-disc list-inside">
              {staticPromo.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Syarat & Ketentuan */}
        {staticPromo.terms && (
          <div className="bg-spotify-light-card-bg rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-spotify-text-white mb-3">Syarat & Ketentuan</h2>
            <p className="text-spotify-text-light-grey text-sm leading-relaxed whitespace-pre-line">{staticPromo.terms}</p>
          </div>
        )}

        {/* Tombol Aksi */}
        <Button
          onClick={() => alert(`Tombol Klaim untuk promo: ${staticPromo.title} diklik!`)}
          className="w-full bg-spotify-green text-spotify-black font-bold py-3 rounded-full hover:bg-opacity-90 transition-colors text-lg"
        >
          Klaim Promo Ini Sekarang
        </Button>
      </div>
    </div>
  );
};

export default PromoDetailPage;