import React from 'react';
import Background from './pages/background';
import Hero from './pages/hero';
import Navbar from './pages/navbar';
import ThemeToggleButton from '@/components/ui/Toggle';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Background/>
      <Hero />
      <ThemeToggleButton />
    </>
  );
};

export default HomePage;
