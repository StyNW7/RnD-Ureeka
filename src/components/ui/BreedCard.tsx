import React from 'react';

interface BreedCardProps {
  name: string;
  description: string,
  origin:string,
  className?: string;
}

const BreedCard: React.FC<BreedCardProps> = ({ name, description, origin, className = '' }) => {
  const truncatedName = name.length > 25 ? name.slice(0, 22) + '...' : name;
  const truncatedDescription = description.length > 25 ? description.slice(0, 150) + '...' : description;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div>
        <h2 className="text-lg font-bold mb-2">{truncatedName}</h2>
        <p className="text-sm text-gray-600 mb-4">{truncatedDescription}</p>
      </div>
      <p className="text-xs text-gray-500">Origin: {origin}</p>
    </div>
  );
};

export default BreedCard;
