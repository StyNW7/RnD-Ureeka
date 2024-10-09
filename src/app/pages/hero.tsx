// app/page.tsx
"use client"; // Pastikan halaman ini menggunakan client components
import React from 'react';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { AuroraBackground } from '@/components/ui/aurora-background';

const HomePage: React.FC = () => {
  return (
    <AuroraBackground>
        <HeroHighlight>
        <h1 className="text-4xl font-bold text-center">
            Selamat Datang di <Highlight>Aceternity UI</Highlight>!
        </h1>
        </HeroHighlight>
    </AuroraBackground>
  );
};

export default HomePage;
