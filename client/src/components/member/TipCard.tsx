// src/components/TipCard.tsx

import React from 'react';

interface TipCardProps {
  title: string;
  imageSrc: string;
}

const TipCard: React.FC<TipCardProps> = ({ title, imageSrc }) => {
  return (
    <div className="bg-spotify-card-bg rounded-lg overflow-hidden shadow-md">
      <img src={imageSrc} alt={title} className="w-full h-auto aspect-video object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-spotify-text-white">{title}</h3>
        {/* Anda bisa menambahkan deskripsi singkat di sini jika diperlukan */}
      </div>
    </div>
  );
};

export default TipCard;