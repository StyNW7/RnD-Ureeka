"use client"

import { auth } from "@/lib/firebase/init"
import { signOut } from "firebase/auth"

const Logout = () => {
  
  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">
      Logout
    </button>
  )
}

export default Logout
