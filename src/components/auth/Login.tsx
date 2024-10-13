// src/components/Login.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from "@/lib/firebase/init"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CardItem } from "@/components/ui/3d-card";

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
      <CardItem 
                translateZ="60"
                translateY="-10"
                rotateX={10}
      >
        <h2 className="text-2xl font-extrabold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </CardItem>
      <CardItem 
        className="mb-4 w-full"
        translateZ= {90}  
        rotateX={12}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                required 
                />
          </div>
        </div>

      </CardItem>
      <CardItem 
        className="mb-4 w-full"
        translateZ={90}  
        rotateX={-12}
      >
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                required 
                />
          </div>
        </div>
      </CardItem>
      <CardItem
        translateZ={60}
        rotateX={-15}
        className='mt-10 w-full'
      >
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200">
          Login
        </button>
      </CardItem>
    </form>
  );
};

export default Login;