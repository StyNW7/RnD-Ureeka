"use client";
// import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Card from "@/components/blocks/cards-demo-1"

export default function HeroHighlightDemo() {
  return (

    <HeroHighlight>

        <Highlight className="text-black dark:text-white text-5xl align-middle font-bold justify-center text-left">
          Offering Best Cats
        </Highlight>

        <br />

        <div>
        <div className='container pt-16'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 mb-12 justify-center'>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>
      </div>

    </HeroHighlight>
    
  );
}
