import React from 'react';
import Image from 'next/image';

interface propsType {
    img: string;
    title: string;
    desc: string;
    price: number;
}

const CatsCard: React.FC<propsType> = ({ img, title, desc, price }) => {

  const formatToIndonesianCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className='cats-card border border-gray-200 rounded-lg p-4 w-[200px] overflow-hidden flex flex-col items-start gap-4'>
      <div className='w-full h-[200px] rounded-lg overflow-hidden'>
        <Image
          className="object-cover w-full h-full rounded-lg"
          src={img}
          width={200}
          height={200}
          alt={title}
        />
      </div>
      <div className='space-y-2'>
        <h2 className='text-orange-500 font-medium'>{title}</h2>
        <p className='text-gray-500'>{desc}</p>
        <div className='font-bold'>
          {formatToIndonesianCurrency(price)}
        </div>
      </div>
    </div>
  );
}
export default CatsCard
