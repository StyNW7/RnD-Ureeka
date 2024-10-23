import React from 'react';
import { UserAttributes } from '@/components/admin/BackEnd/utils';
import moment from 'moment';
import Image from 'next/image';

const BreedCard: React.FC<UserAttributes> = ({ id, name, experience, isAdmin, money, multiplier, profpic, createdAt}) => {
  const truncatedName = name.length > 15 ? name.slice(0, 15) + '...' : name;
  const formatToIDR = (amount: number): string => {
    
    let suffix = '';
    let shortenedAmount = amount;

    if (amount >= 1_000_000_000_000_000_000) {
        shortenedAmount = amount / 1_000_000_000_000_000_000;
        suffix = 'E'; // Exa (Quintillion)
    } else if (amount >= 1_000_000_000_000_000) {
        shortenedAmount = amount / 1_000_000_000_000_000;
        suffix = 'P'; // Peta (Quadrillion)
    } else if (amount >= 1_000_000_000_000) {
        shortenedAmount = amount / 1_000_000_000_000;
        suffix = 'T'; // Trillion
    } else if (amount >= 1_000_000_000) {
        shortenedAmount = amount / 1_000_000_000;
        suffix = 'B'; // Billion
    } else if (amount >= 1_000_000) {
        shortenedAmount = amount / 1_000_000;
        suffix = 'M'; // Million
    } else if (amount >= 1_000) {
        shortenedAmount = amount / 1_000;
        suffix = 'K'; // Thousand
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(shortenedAmount) + suffix;
  };

  return (
    <div className={`cats-card border border-gray-200 rounded-lg p-6 w-[370px] overflow-hidden flex flex-col items-start gap-4 ${isAdmin ? "bg-red-300 dark:bg-red-800" : "bg-white dark:bg-gray-800"}`}>
      <div className='w-full h-[200px] rounded-lg overflow-hidden'>
        <Image
          className="object-cover w-full h-full rounded-lg"
          src={profpic}
          width={300}
          height={300}
          alt={name}
        />
      </div>
      <div className='space-y-2'>
        <h2 className={`${isAdmin ? "text-violet-600 dark:text-violet-400" : "text-orange-500"} font-medium `}>{name}</h2>
        <p className=' '><strong>Id</strong>: {" " + id}</p>
        <p className=' '><strong>Xp</strong>: {" " +experience}</p>
        <p className=' '><strong>Multiplier</strong>: {" " +multiplier}</p>
        <p className=''><strong>Money</strong>:{" " + formatToIDR(money)}</p>
        <p className=''><strong>Created at</strong>:{" " + moment(createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
    </div>
  );
};

export default BreedCard;
