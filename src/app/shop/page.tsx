"use client";

// import UserPillTopRight from "../pages/userpilltopright";
import React from 'react';
import ShoppingHeaderTop from "@/components/ui/forShopPage/shop-headerTop";
import CatOptions from '@/components/ui/forShopPage/catoptions';
// import Carousel from '@/components/ui/forShopPage/CarouselImg';
import CarouselImg from '@/components/ui/forShopPage/CarouselImg';
import AllCats from '@/components/ui/forShopPage/AllCats';
import withAuth from '@/hoc/withAuth';
import { useState } from 'react';

const ShopPage: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string|null>(null);


    return (
      <>
        {/* <h1>Shopping page</h1> */}
        {/* <UserPillTopRight /> */}
        <ShoppingHeaderTop />
        <CatOptions 
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
        <CarouselImg />
        <AllCats 
          selectedBreed={selectedBreed}
        />
        <p className='font-thin text-slate-400 w-full text-center mt-16 mb-6'>Copyrights NewmeoW © 2024. All Rights Reserved</p>
      </>
    );
};
  
export default withAuth(ShopPage);