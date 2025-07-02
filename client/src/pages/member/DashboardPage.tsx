// src/pages/Dashboard.tsx

import React from 'react';
import MemberCard from '@/components/member/MemberCard';
import { ArrowRight, History, Repeat } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
      <div className="space-y-8">
        {/* Header Sambutan */}
        <h1 className="text-3xl font-bold text-white">Selamat Datang!</h1>
        
        {/* Kartu Member */}
        <div className="flex justify-center">
          <MemberCard />
        </div>

        {/* Aksi Cepat */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Tombol Aksi 1 */}
            <div className="bg-[#181818] p-4 rounded-lg flex justify-between items-center hover:bg-[#282828] transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <Repeat className="text-spotify-dimmed" size={24} />
                <span className="text-white">Perpanjang Paket</span>
              </div>
              <ArrowRight className="text-spotify-dimmed" size={20} />
            </div>

            {/* Tombol Aksi 2 */}
             <div className="bg-[#181818] p-4 rounded-lg flex justify-between items-center hover:bg-[#282828] transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <History className="text-spotify-dimmed" size={24} />
                <span className="text-white">Lihat Riwayat Absensi</span>
              </div>
              <ArrowRight className="text-spotify-dimmed" size={20} />
            </div>

          </div>
        </div>

      </div>
  );
};

export default Dashboard;