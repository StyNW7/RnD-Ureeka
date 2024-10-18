"use client"

import Image from "next/image"

// User profile pill for profile information (includes money and username)

// not yet implemented the update process for when the money goes up after clicks or exp bar filled

export default function UserPill(){
    return (
    <div className="flex items-center bg-gray-500 rounded-full p-1 pr-5 shadow-md w-1/6 h-16">
      {/* Placeholder untuk gambar profil */}
      <div className="h-full aspect-square bg-gray-300 rounded-full mr-3 overflow-hidden">
        <Image src="/images/user_profile_placeholder.jpg" alt="user profile placeholder" className="w-full h-full object-cover" />
      </div>
      
      <div className="flex flex-col justify-between h-full flex-grow">
        {/* Placeholder untuk nama pengguna */}
        <div className="mb-1 w-full flex">
            <span className="text-sm font-semibold">Someone</span>
            <span className="text-sm font-semibold ml-auto">{ 'Lv.'  + 32 }</span>
        </div>
        
        {/* Bar progres EXP */}
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div className="bg-blue-600 h-full rounded-full" style={{width: '32%'}}>&#8205;</div>
        </div>
        
        {/* Placeholder untuk uang pengguna */}
        <span className="text-sm font-bold mt-1">$ 200</span>
      </div>
    </div>
    )
}
