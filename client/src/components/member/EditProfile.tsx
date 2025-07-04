// src/pages/EditProfilePage.tsx

import React, { useState, useRef } from 'react'; // Tambah useRef
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar Shadcn UI
import { ChevronLeft, Camera } from 'lucide-react'; // Tambah Camera icon

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref untuk input file

  // Data dummy user saat ini (akan diambil dari API user yang sedang login)
  const [formData, setFormData] = useState({
    name: "Budi Santoso",
    username: "budisantoso",
    email: "budi.santoso@example.com",
    phoneNumber: "0812-3456-7890",
  });

  // State baru untuk foto profil
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>('https://github.com/shadcn.png'); // URL avatar default

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file); // Simpan file untuk "upload"
      setAvatarPreviewUrl(URL.createObjectURL(file)); // Buat URL untuk preview
    }
  };

  const handleClickAvatarChange = () => {
    fileInputRef.current?.click(); // Memicu klik pada input file tersembunyi
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Profil Disimpan:", formData);
    console.log("File Avatar Dipilih:", avatarFile);

    // --- LOGIKA SIMULASI UPLOAD DAN UPDATE ---
    // Di sini Anda akan mengirim `formData` dan `avatarFile` ke API backend.
    // Jika `avatarFile` ada, Anda akan mengunggahnya ke storage (misal S3, Cloudinary)
    // lalu menyimpan URL yang dikembalikan ke database user.
    // Setelah semua sukses:
    alert("Profil dan foto berhasil diperbarui!");
    navigate('/account'); // Kembali ke halaman akun setelah update
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-screen-md mx-auto bg-spotify-card-bg rounded-xl shadow-2xl p-4 space-y-6 md:p-6 md:space-y-8">
        {/* Tombol Kembali */}
        <Link to="/account" className="inline-flex items-center text-spotify-text-light-grey hover:text-spotify-text-white transition-colors text-sm font-semibold mb-4">
          <ChevronLeft size={20} className="mr-1" /> Kembali ke Akun
        </Link>

        {/* Header Halaman */}
        <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white leading-tight mb-4 text-center">
          Edit <span className="text-spotify-green">Profil</span>
        </h1>
        <p className="text-spotify-text-light-grey text-sm md:text-base mb-8 text-center">
          Perbarui informasi pribadi dan foto Anda.
        </p>

        {/* Form Edit Profil */}
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Informasi Pribadi</CardTitle>
            <CardDescription className="text-spotify-text-light-grey text-sm">
              Perbarui detail akun Anda di sini.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Bagian Ubah Foto Profil */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar className="w-32 h-32 border-4 border-spotify-green shadow-md relative group">
                  <AvatarImage src={avatarPreviewUrl} alt="Foto Profil" />
                  <AvatarFallback className="bg-spotify-green/20 text-spotify-green text-5xl font-bold">
                    {formData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                  <div 
                    onClick={handleClickAvatarChange}
                    className="absolute inset-0 bg-spotify-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    title="Ubah Foto"
                  >
                    <Camera size={32} className="text-spotify-text-white" />
                  </div>
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden" // Sembunyikan input file
                />
                <Button 
                  onClick={handleClickAvatarChange} 
                  type="button" // Penting: type="button" agar tidak submit form
                  variant="ghost" 
                  className="text-spotify-green hover:hover:text-spotify-text-white"
                >
                  Ubah Foto Profil
                </Button>
              </div>

              {/* Form Fields */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-spotify-text-white">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green placeholder:text-spotify-placeholder-grey"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-spotify-text-white">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green placeholder:text-spotify-placeholder-grey"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-spotify-text-white">Nomor Telepon</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green placeholder:text-spotify-placeholder-grey"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-6">
              <Button
                type="submit"
                className="w-full bg-spotify-green text-spotify-black font-bold py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Simpan Perubahan
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;