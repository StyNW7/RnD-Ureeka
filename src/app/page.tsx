import React from 'react';
import Hero from '@/pages/hero';
import WoobleCard from '@/pages/WoobleCard';
// import ThemeToggleButton from '@/components/ui/Toggle';
// import Card from "@/components/blocks/cards-demo-1";
// import CardSection from "@/pages/OverlayCardSection";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage: React.FC = () => {
  return (
    <>
      {/* <ThemeToggleButton /> */}
      <Hero />
      <WoobleCard/>
      {/* <Card/> */}
      {/* <CardSection/> */}
    </>
  );
};

export default HomePage;
