// app/page.tsx
"use client"; // Pastikan halaman ini menggunakan client components
import React from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';

const HomePage: React.FC = () => {
  return (
    <AuroraBackground/>
    // </AuroraBackground>
  );
};

export default HomePage;
