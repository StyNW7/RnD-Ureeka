import React from 'react';
import { BreedAttributes } from '@/components/admin/BackEnd/utils';

const BreedCard: React.FC<BreedAttributes> = ({ name, description, origin }) => {
  const truncatedName = name.length > 25 ? name.slice(0, 22) + '...' : name;
  const truncatedDescription = description.length > 25 ? description.slice(0, 150) + '...' : description;

  return (
    <div className={`bg-gradient-to-b from-orange-500 to-orange-400 rounded-lg shadow-md p-4 w-40 h-44 flex flex-col justify-between`}>
      <div>
        <h2 className="text-lg text-white font-bold mb-2">{truncatedName}</h2>
        <p className="text-sm text-white mb-4">{truncatedDescription}</p>
      </div>
      <p className="text-xs text-white">Origin: {origin}</p>
    </div>
  );
};

export default BreedCard;
