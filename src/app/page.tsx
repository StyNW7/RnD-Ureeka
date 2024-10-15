import React from 'react';
import Hero from '@/pages/hero';
import WoobleCard from '@/pages/WoobleCard';
// import Card from "@/components/blocks/cards-demo-1";
import CardSection from "@/pages/OverlayCardSection";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from '@/pages/ImageSlider';
import Globe from '@/pages/Globe';

const HomePage: React.FC = () => {
  return (
    <>
      {/* <ThemeToggleButton /> */}
      <Hero />
      <WoobleCard/>
      {/* <Card/> */}
      <CardSection/>
      <ImageSlider/>
      <Globe />
    </>
  );
};

export default HomePage;
