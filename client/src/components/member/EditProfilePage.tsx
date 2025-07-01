// EditProfilePage.tsx

import React, { useState } from 'react';

const EditProfilePage: React.FC = () => {
  const [username, setUsername] = useState('BudiSantoso');
  const [email, setEmail] = useState('budi.santoso@email.com');
  const [phone, setPhone] = useState('081234567890');
  const [password, setPassword] = useState(''); // Tidak menampilkan password asli

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan perubahan profil
    alert('Profil berhasil diperbarui!');
  };

  return (
    <div className="min-h-screen bg-dark text-light p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center mb-6">
        <button className="text-light text-2xl mr-4 hover:text-accent-green transition-colors">
          &larr;
        </button> {/* Tombol Kembali */}
        <h1 className="text-2xl font-bold">Edit Profil</h1>
      </header>

      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-semibold text-dimmed mb-3">
            BS
          </div>
          <button className="text-accent-green text-sm hover:underline">Ubah Foto Profil</button>
        </div>

        {/* Form Edit Profil */}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-dimmed mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 bg-dark border border-border-color rounded-md focus:outline-none focus:border-accent-green"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-dimmed mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-dark border border-border-color rounded-md focus:outline-none focus:border-accent-green"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-dimmed mb-1">Nomor Telepon</label>
            <input
              type="tel"
              id="phone"
              className="w-full p-3 bg-dark border border-border-color rounded-md focus:outline-none focus:border-accent-green"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-dimmed mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-dark border border-border-color rounded-md focus:outline-none focus:border-accent-green"
              placeholder="Masukkan password baru (kosongkan jika tidak ingin mengubah)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-green text-dark font-semibold py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Simpan Perubahan
          </button>
        </form>

        {/* Informasi Tambahan (Tidak Bisa Diedit) */}
        <div className="mt-6 pt-6 border-t border-border-color text-sm text-dimmed">
          <p className="mb-2"><span className="font-semibold text-light">Role:</span> Member</p>
          <p className="mb-2"><span className="font-semibold text-light">Status Akun:</span> Aktif</p>
          <p><span className="font-semibold text-light">Tanggal Bergabung:</span> 01 Januari 2024</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;