// src/app/auth/page.tsx
"use client"

import { useState } from "react";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Logout from "@/components/auth/Logout";
import AnimatedCat from "@/components/ui/catAnim/animated-cat";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import styles from "./main.module.css"

const AuthPage = () => {
  
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center min-h-[100vh]">
      <CardContainer className="inter-var">
        <CardBody className=" bg-gradient-to-b to-orange-300 from-orange-400 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <div className={`absolute ${isLogin ? styles.catposLogin : styles.catposSign}`}>
            <AnimatedCat />
          </div>
          <div className="flex justify-center mb-4 gap-3">
            <CardItem
              translateZ={60}
              translateX={-20}
              rotateY={-5}
              rotateX={10}
            >
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 font-bold ${isLogin ? "border-b-2 border-blue-500" : "text-gray-500"}`}
              >
                Login
              </button>
            </CardItem>
            <CardItem
              translateZ={80}
              rotateX={10}
            >
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 font-bold ${!isLogin ? "border-b-2 border-blue-500" : "text-gray-500"}`}
              >
                Sign Up
              </button>
            </CardItem>
            <CardItem
              translateZ={60}
              translateX={20}
              rotateY={5}
              rotateX={10}
            >
              <Logout />
            </CardItem>
          </div>
          {isLogin ? <Login /> : <Signup setIsLogin={setIsLogin} />}
        </CardBody>
      </CardContainer>
    </div>
  )
}

export default AuthPage