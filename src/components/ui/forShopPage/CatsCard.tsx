import React from 'react';
import Image from 'next/image';

interface propsType {
    img: string;
    title: string;
    desc: string;
    price: string;
}

const CatsCard: React.FC<propsType> = ({ img, title, desc, price }) => {
  return (
    <div className='cats-card border border-gray-200 rounded-lg p-4 w-[200px] overflow-hidden flex flex-col items-start gap-4'>
      <div className='w-full h-[200px] rounded-lg overflow-hidden'>
        <Image
          className="object-cover w-full h-full rounded-lg" // Pastikan gambar mengikuti sudut rounded container
          src={img}
          width={200}
          height={200}
          alt={title}
        />
      </div>
      <div className='space-y-2'>
        <h2 className='text-orange-500 font-medium uppercase'>{title}</h2>
        <p className='text-gray-500'>{desc}</p>
        <div className='font-bold'>
          Rp {price}
        </div>
      </div>
    </div>
  );
}
export default CatsCard
