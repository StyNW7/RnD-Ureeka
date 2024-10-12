/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react"
import { auth } from "@/lib/firebase/init"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2">
        Sign Up
      </button>
    </form>
  )
}

export default Signup
