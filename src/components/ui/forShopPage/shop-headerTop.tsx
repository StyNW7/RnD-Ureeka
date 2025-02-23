import React from "react"
// import { PiCat } from "react-icons/pi";
// import { TbCat } from "react-icons/tb";
// import { LuCat } from "react-icons/lu";
// import { PiCatDuotone } from "react-icons/pi";
// import { div } from "framer-motion/client";
import { MdSearch } from "react-icons/md";
import { GiPawHeart } from "react-icons/gi";
import { TbHomeHeart } from "react-icons/tb";
import Link from "next/link";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { navItems } from "@/pages/navbar";

const ShoppingHeaderTop: React.FC = () => {
    return (
        <div className="border border-gray-800 py-6 w-full z-20 fixed top-0 bg-white dark:bg-slate-600">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Icon para /ᐠ - ˕ -マ Ⳋ*/}
                <div className="flex gap-1 pl-4 items-center">
                    <Image src="/images/logo.png" alt="Logo" width={180} height={50} />
                </div>

                {/* Search Bar ദ്ദി（• ˕ •マ.ᐟ*/}
                <div className="flex-grow flex items-center justify-center relative">
                    <div className="w-full lg:w-2/3 xl:w-1/2 relative">
                        <input
                            className="border-gray-300 border p-2 pl-10 pr-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            type="text"
                            placeholder="What cat u lookin for? ฅ^•ﻌ•^ฅ"/>
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <ul className="flex w-1/3 justify-around ml-auto mr-auto">
                        {navItems.map((e:any, idx:number)=>{
                            return(
                                <li key={`link=${idx}`}>
                                    <Link
                                        href={e.link}
                                        className={cn(
                                          `border border-zinc-700 rounded-2xl transition-colors dark:hover:bg-slate-600 font-semibold ${e.link === "/shop" ? "bg-orange-400" : "hover:bg-orange-400"} p-3 w-24 flex justify-center`
                                        )}
                                    >
                                        <div className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600">
                                            <span className="block sm:hidden">{e.icon}</span>
                                            <span className="hidden sm:block text-sm">{e.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="hidden lg:flex gap-4 text-[30px] ml-auto">
                        <div className="relative">
                            <GiPawHeart className="opacity-100" />
                            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                                {0}
                            </div>
                        </div>
                        <div className="relative">
                            <TbHomeHeart className="opacity-100" />
                            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                                {0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingHeaderTop;
