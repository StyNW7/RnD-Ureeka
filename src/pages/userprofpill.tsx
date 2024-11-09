"use client"

import { UserAttributes, formatToIndonesianCurrency } from "@/components/admin/BackEnd/utils"
import Image from "next/image"
import React from "react"

// User profile pill for profile information (includes money and username)

// not yet implemented the update process for when the money goes up after clicks or exp bar filled

const UserPill: React.FC<UserAttributes> = ({ id, createdAt, experience, isAdmin, money, multiplier, name, profpic})=>{
    return (
    <div className="flex items-center bg-amber-400 rounded-full p-1 pr-5 shadow-md w-1/5 h-16 dark:bg-gray-500">
      {/* Placeholder untuk gambar profil */}
      <div className="h-full aspect-square bg-gray-300 rounded-full mr-3 overflow-hidden">
        <Image width={200} height={200} src={profpic} alt="user profile placeholder" className="w-full h-full object-cover" />
      </div>
      
      <div className="flex flex-col justify-between h-full flex-grow">
        {/* Placeholder untuk nama pengguna */}
        <div className="mb-1 w-full flex">
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-sm font-semibold ml-auto">{ 'Lv.' + Math.floor(experience/1500) }</span>
        </div>
        
        {/* Bar progres EXP */}
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div className="bg-blue-600 h-full rounded-full" style={{width: `${((experience%1500)/1500)*100}%`}}>&#8205;</div>
        </div>
        
        {/* Placeholder untuk uang pengguna */}
        <span className="text-sm font-bold mt-1">{ formatToIndonesianCurrency(money) }</span>
      </div>
    </div>
    )
}

export default UserPill;
