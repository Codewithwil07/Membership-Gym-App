// src/pages/AccountPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Lock,
  Tag, // Untuk Role
  CheckCircle, // Untuk Status Akun
  Ban, // Untuk Status Akun Nonaktif/Suspended
} from 'lucide-react';

import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale'; // Pastikan locale id terimport dengan alias

const AccountPage: React.FC = () => {
  // --- Data Dummy User (akan diambil dari API nanti, mencakup semua dari ERD) ---
  const currentUser = {
    id: 1, // Contoh ID
    username: "budisantoso", // <<-- Baru dari ERD
    name: "Budi Santoso",
    avatarUrl: "https://github.com/shadcn.png",
    avatarInitials: "BS",
    email: "budi.santoso@example.com",
    phoneNumber: "0812-3456-7890", // `no_hp` dari ERD
    role: "member", // <<-- Baru dari ERD
    accountStatus: "aktif", // `status_akun` dari ERD
    joinDate: new Date('2024-01-15'), // `tanggal_bergabung` dari ERD (dalam Date object)
    membershipTier: "Gold Member", // Untuk info tambahan
  };
  // --- Akhir Data Dummy ---

  // Format tanggal bergabung
  const formattedJoinDate = format(currentUser.joinDate, 'dd MMMM yyyy', { locale: idLocale });

  const handleEditProfile = () => {
    alert("Mengarahkan ke halaman/modal edit profil.");
  };

  const handleChangePassword = () => {
    alert("Mengarahkan ke halaman/modal ubah password.");
  };

  const getAccountStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aktif':
        return <CheckCircle size={20} className="text-spotify-green" />;
      case 'nonaktif':
        return <Ban size={20} className="text-red-500" />;
      case 'suspended':
        return <Ban size={20} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Halaman */}
      <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
        Pengaturan <span className="text-spotify-green">Akun</span>
      </h1>
      <p className="text-spotify-dimmed text-sm md:text-base mb-8">
        Kelola informasi pribadi dan keamanan akun Anda.
      </p>

      {/* Bagian Informasi Profil */}
      <Card className="bg-spotify-card-active border border-spotify-light-border text-white rounded-xl shadow-lg p-5 md:p-6">
        <CardHeader className="flex flex-col items-center text-center pb-4">
          <Avatar className="w-24 h-24 mb-4 border-4 border-spotify-green shadow-md">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="bg-spotify-green/20 text-spotify-green text-4xl font-bold">
              {currentUser.avatarInitials}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{currentUser.name}</CardTitle>
          <CardDescription className="text-spotify-dimmed text-base">
            {currentUser.membershipTier}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          {/* Username */}
          <div className="flex items-center gap-3 text-spotify-light-text">
            <UserIcon size={20} className="text-spotify-green" />
            <span>Username: <span className="font-semibold">{currentUser.username}</span></span>
          </div>
          {/* Email */}
          <div className="flex items-center gap-3 text-spotify-light-text">
            <Mail size={20} className="text-spotify-green" />
            <span>Email: <span className="font-semibold">{currentUser.email}</span></span>
          </div>
          {/* Nomor HP */}
          <div className="flex items-center gap-3 text-spotify-light-text">
            <Phone size={20} className="text-spotify-green" />
            <span>Telepon: <span className="font-semibold">{currentUser.phoneNumber}</span></span>
          </div>
          {/* Role */}
          <div className="flex items-center gap-3 text-spotify-light-text">
            <Tag size={20} className="text-spotify-green" />
            <span>Role: <span className="font-semibold capitalize">{currentUser.role}</span></span>
          </div>
          {/* Status Akun */}
          <div className="flex items-center gap-3 text-spotify-light-text">
            {getAccountStatusIcon(currentUser.accountStatus)}
            <span>Status Akun: <span className="font-semibold capitalize">{currentUser.accountStatus}</span></span>
          </div>
          {/* Tanggal Bergabung */}
          <div className="flex items-center gap-3 text-spotify-light-text">
            <Calendar size={20} className="text-spotify-green" />
            <span>Bergabung sejak: <span className="font-semibold">{formattedJoinDate}</span></span>
          </div>
        </CardContent>
        <CardFooter className="pt-4 px-6">
          <Button
            onClick={handleEditProfile}
            className="w-full bg-spotify-green text-black font-bold py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Edit Profil
          </Button>
        </CardFooter>
      </Card>

      {/* Bagian Ubah Password */}
      <Card className="bg-spotify-card-active border border-spotify-light-border text-white rounded-xl shadow-lg p-5 md:p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Lock size={20} className="text-spotify-green" /> Ubah Password
          </CardTitle>
          <CardDescription className="text-spotify-dimmed text-sm">
            Jaga keamanan akun Anda dengan mengganti password secara berkala.
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-4 px-6">
          <Button
            onClick={handleChangePassword}
            className="w-full bg-gray-700 text-white font-bold py-2 rounded-full hover:bg-gray-600 transition-colors"
          >
            Ganti Password
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
};

export default AccountPage;