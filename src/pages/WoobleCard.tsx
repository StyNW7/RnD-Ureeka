"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function WobbleCardDemo() {

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">

      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >

        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Welcome to NeWmeow
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          At Purrfect Companions, we believe every home deserves a little paw-some magic! Whether you're searching for a playful kitten to brighten your days or an elegant feline friend to share quiet moments
          </p>
        </div>

        <Image
          src="/cats/kittens1.gif"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[10%] filter -bottom-10 object-contain rounded-2xl"
        />

      </WobbleCard>


      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Small, Cute, and Lovely Catz 🥰
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          We offer best cats that you will definitely like it. Not only quality but we offer it with cheap price!
        </p>
      </WobbleCard>


      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] mb-20">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            NeWmeow Experience
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Not only do we match you with the cat of your dreams, but we also ensure a seamless and loving adoption process. Our expert team will guide you in choosing the right kitty, providing tips and support to help your new companion feel right at home.
          </p>
        </div>
        <Image
          src="/cats/kittens2.gif"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[30%] lg:-right-[8%] -bottom-2 object-contain rounded-2xl"
        />
      </WobbleCard>

    </div>
  );
}
