"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
// import { useRouter } from 'next/router';

export default function ImagesSliderDemo() {

  // const router = useRouter();

  // const handleClick = () => {
  //   router.push('/auth');
  // };

  const images = [
    "/carousel-cats/blh/1.jpg",
    "/carousel-cats/blh/2.jpg",
    "/carousel-cats/blh/3.jpg",
  ];

  return (
    <ImagesSlider className="h-[40rem]" images={images}>

      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >

        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Join with our community!
          <br />
        </motion.p>

        <a href="/auth">
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Join now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </a>

        {/* <div
              className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4 inline-block cursor-pointer z-30"
              onClick={handleClick}
            >
              <span>Join now →</span>
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </div> */}

      </motion.div>

    </ImagesSlider>

  );
}
