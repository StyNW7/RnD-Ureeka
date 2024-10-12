// src/app/auth/page.tsx
"use client"

import { useState } from "react"
import Login from "@/components/auth/Login"
import Signup from "@/components/auth/Signup"
import Logout from "@/components/auth/Logout"

const AuthPage = () => {
  
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 ${isLogin ? "border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 ${!isLogin ? "border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            Sign Up
          </button>
          <Logout />
        </div>
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  )
}

export default AuthPage