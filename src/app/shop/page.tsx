"use client";

// import UserPillTopRight from "../pages/userpilltopright";
import React from 'react';
import ShoppingHeaderTop from "@/components/ui/forShopPage/shop-headerTop";
import CatOptions from '@/components/ui/forShopPage/catoptions';
import Carousel from '@/components/ui/forShopPage/CarouselImg';
import CarouselImg from '@/components/ui/forShopPage/CarouselImg';
import AllCats from '@/components/ui/forShopPage/AllCats';

const ShopPage: React.FC = () => {
    return (
      <>
        {/* <h1>Shopping page</h1> */}
        {/* <UserPillTopRight /> */}
        <ShoppingHeaderTop />
        <CatOptions />
        <CarouselImg />
        <AllCats />
      </>
    );
};
  
export default ShopPage;