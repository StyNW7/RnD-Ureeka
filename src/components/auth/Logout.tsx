"use client"

import { auth } from "@/lib/firebase/init"
import { signOut } from "firebase/auth"

const Logout = () => {
  
  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
    // getAuth tidak return currentUser
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  )
}

export default Logout
