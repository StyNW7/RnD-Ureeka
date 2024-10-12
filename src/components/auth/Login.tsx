// src/components/Login.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from "@/lib/firebase/init"
import { signInWithEmailAndPassword } from 'firebase/auth';

// interface LoginProps {
//   // Tambahkan props tambahan jika diperlukan
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error sebelum mencoba login
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect ke Dashboard setelah login berhasil
      router.push('/useronly');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200">
        Login
      </button>
    </form>
  );
};

export default Login;