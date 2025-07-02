// src/components/PromoCard.tsx

import React from 'react';

interface PromoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ title, description, imageSrc, link }) => {
  return (
    <div className="bg-spotify-card-bg rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-in-out">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-spotify-text-white mb-2">{title}</h3>
        <p className="text-spotify-text-light-grey text-sm mb-4">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline text-sm font-medium">
          Lihat Detail →
        </a>
      </div>
    </div>
  );
};

export default PromoCard;