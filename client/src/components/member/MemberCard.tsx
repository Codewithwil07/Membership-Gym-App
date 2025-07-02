// src/components/MemberCard.tsx

import React from 'react';
import { Crown, QrCode } from 'lucide-react';

const MemberCard: React.FC = () => {
  // Data ini nantinya akan datang dari API
  const memberData = {
    name: 'Nama Pengguna',
    memberId: 'M-12345678',
    status: 'Aktif',
    expiryDate: '31 Desember 2025',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example-member-id',
  };

  return (
    <div className="bg-gradient-to-br from-[#282828] to-[#121212] rounded-xl shadow-lg w-full max-w-sm mx-auto border border-gold-dark overflow-hidden">
      {/* Header Kartu */}
      <div className="flex justify-between items-center p-5 bg-black bg-opacity-20">
        <div className="flex items-center space-x-2">
          <Crown className="text-gold" size={24} />
          <h2 className="text-lg font-bold text-gold">MEMBER GOLD</h2>
        </div>
        <span className="text-xs font-semibold text-black bg-spotify-green px-3 py-1 rounded-full">
          {memberData.status}
        </span>
      </div>

      {/* Konten Utama (QR dan Nama) */}
      <div className="flex flex-col items-center py-8 px-5">
        <div className="w-40 h-40 bg-white p-2 rounded-lg flex items-center justify-center shadow-md">
          {/* Menggunakan ikon jika URL tidak ada, atau gambar jika ada */}
          {memberData.qrCodeUrl ? (
            <img src={memberData.qrCodeUrl} alt="QR Code Member" />
          ) : (
            <QrCode size={100} className="text-gray-400" />
          )}
        </div>
        <h3 className="text-2xl font-semibold text-white mt-5">{memberData.name}</h3>
        <p className="text-spotify-dimmed text-sm">{memberData.memberId}</p>
      </div>

      {/* Footer Kartu (Masa Berlaku) */}
      <div className="text-center bg-black bg-opacity-20 px-5 py-4">
        <p className="text-spotify-dimmed text-xs uppercase tracking-wider">Berlaku Hingga</p>
        <p className="text-gold-light font-medium text-lg">{memberData.expiryDate}</p>
      </div>
    </div>
  );
};

export default MemberCard;