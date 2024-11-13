"use client";

// import UserPillTopRight from "../pages/userpilltopright";
import React from 'react';
import ShoppingHeaderTop from "@/components/ui/forShopPage/shop-headerTop";
import CatOptions from '@/components/ui/forShopPage/catoptions';
// import Carousel from '@/components/ui/forShopPage/CarouselImg';
import CarouselImg from '@/components/ui/forShopPage/CarouselImg';
import AllCats from '@/components/ui/forShopPage/AllCats';
import withAuth from '@/hoc/withAuth';
import NotificationPill from '@/components/ui/NotificationPill';
import { useState } from 'react';

const ShopPage: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string|null>(null);
  const [notif, setNotif] = useState<string|null>(null);
  const [notifStatus, setNotifStatus] = useState<"warn"|"success">("success");
  const [animateInOut, setAnimateInOut] = useState<"in"|"out">("in");
  const [notifMessage, setNotifMessage] = useState<string>("");

    return (
      <div className='mt-28'>
        {/* <h1>Shopping page</h1> */}
        {/* <UserPillTopRight /> */}
        <ShoppingHeaderTop />
        {notif && (
          <NotificationPill 
            notif={notif} 
            notifStatus={notifStatus} 
            animateInOut={animateInOut}
            notifMessage={notifMessage}
          />
        )}
        <CatOptions 
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
        <CarouselImg />
        <AllCats 
          selectedBreed={selectedBreed}
          setNotif={setNotif}
          setNotifStatus={setNotifStatus}
          setAnimateInOut= {setAnimateInOut}
          setNotifMessage={setNotifMessage}
        />
        <p className='font-thin text-slate-400 w-full text-center mt-16 mb-6'>Copyrights NewmeoW © 2024. All Rights Reserved</p>
      </div>
    );
};
  
export default withAuth(ShopPage);