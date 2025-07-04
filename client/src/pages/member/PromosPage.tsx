// src/pages/PromosPage.tsx

import React from "react";
import PromoCard from "@/components/member/PromoCard";

// Data dummy promo (HARUS SAMA dengan yang di PromoDetailPage.tsx)
const promos = [
  {
    id: 1,
    title: "Diskon 20% Paket Tahunan!",
    description: "Hemat lebih banyak dengan paket tahunan.",
    image:
      "https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3ltfGVufDB8fDB8fHww",
    link: "/promo/detail",
  },
  {
    id: 2,
    title: "Refer Teman, Dapat Bonus!",
    description: "Ajak teman dan dapatkan bonus membership.",
    image:
      "https://media.istockphoto.com/id/2163812336/photo/happy-couple-at-fitness-club.webp?a=1&b=1&s=612x612&w=0&k=20&c=weA5I-YWWGVyNT-a8-onuciZw_dKPV20cQI3jtqMZoo=",
    link: "/promo/detail",
  },
];

const PromosPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {" "}
      {/* Padding dan spasi halaman */}
      <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white leading-tight">
        Promo <span className="text-spotify-green">Terbaru</span>
      </h1>
      <p className="text-spotify-text-light-grey text-sm md:text-base mb-8">
        Lihat penawaran spesial dan diskon menarik yang tersedia hanya untuk
        Anda!
      </p>
      {/* Daftar Promo dalam Grid Responsif */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-screen-xl mx-auto">
        {" "}
        {/* max-w-screen-xl mx-auto untuk memusatkan grid */}
        {promos.map((promo) => (
          <div key={promo.id} className="flex-shrink-0 w-full snap-center">
            <PromoCard imageSrc={promo.image} {...promo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromosPage;
