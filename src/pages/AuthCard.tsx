"use client";

import Image from "next/image";
import React from "react";
import { LuUpload } from "react-icons/lu";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo() {

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Logika untuk menangani upload gambar
        const file = e.target.files?.[0];
        if (file) {
          console.log("Gambar: " + file); // perlu implementasi upload langsung ke db-storage dan tarik balik dalam bentuk url storage
        }
    };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Register 
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Be a cat owner and pet your cat to your heart's content.
        </CardItem>
        <CardItem
          translateZ="80"
          rotateX={10}
          className="w-full mt-4 relative"
        >
          <label htmlFor="imageUpload" className="cursor-pointer block w-full h-40 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 bg-black opacity-30 rounded-full w-16 h-16" />
            <LuUpload className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white z-10"/>
            <Image
              src="/cats/kittens1.gif"
              height={1000}
              width={1000}
              className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </CardItem>
        <form action="#" method="POST">
            <CardItem
                translateZ={100}
                className="w-10/12 mt-7 mx-auto"
            >
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User name</label>
                    <div className="mt-2">
                        <input id="username" name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </CardItem>
            <CardItem
                translateZ={70}
                className="w-10/12 mt-4 mx-auto"
            >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </CardItem>
            <CardItem
                translateZ={100}
                className="w-10/12 mt-4 mx-auto"
            >
                <div>
                    <div className=" flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div className="mt-2 ">
                        <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </CardItem>
            
            <div className="flex justify-between items-center mt-20 border-red-500">
            <CardItem
                translateZ={20}
                translateX={-40}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                Try now →
            </CardItem>
            <CardItem
                translateZ={20}
                translateX={40}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                Sign up
            </CardItem>
            </div>
        </form>
      </CardBody>
    </CardContainer>
  );
}
