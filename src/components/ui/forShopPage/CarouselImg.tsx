"use client";

import React from "react";
import Slider from "react-slick";
import Slide from './Slide';

const CarouselImg = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const slideData = [
    {
      id: 0,
      img: "/carousel-cats/ash1.jpg",
      title: "AMERICAN SHORTHAIR",
      mainTitle: "Playful, Agile, Clingy",
      price: "Rp 4.599.900",
    },
    {
      id: 1,
      img: "/carousel-cats/blh1.jpg",
      title: "BRITISH LONGHAIR",
      mainTitle: "Soft Fur, Independent, Sleep alot",
      price: "Rp 7.299.900",
    },
    {
      id: 2,
      img: "/carousel-cats/munchkin1.jpg",
      title: "MUNCHKIN",
      mainTitle: "Playful, Nocturnal, Affectionate",
      price: "Rp 6.899.900",
    },
    {
      id: 3,
      img: "/carousel-cats/ragdoll1.jpg",
      title: "RAGDOLL",
      mainTitle: "Territorial, Independent, Playful",
      price: "Rp 5.999.900",
    },
    {
      id: 4,
      img: "/carousel-cats/scottish.jpg",
      title: "SCOTTISH",
      mainTitle: "Graceful, Agile, Clingy",
      price: "Rp 4.599.900",
    },
    {
      id: 5,
      img: "/carousel-cats/siamese1.jpg",
      title: "SIAMESE",
      mainTitle: "Curious, Playful, Nocturnal",
      price: "Rp 7.599.900",
    },
  ];

  return (
    <div>
      <div className="container pt-6 lg:pt-0">
        <Slider {...settings}>
          {slideData.map((item) => (
            <Slide 
              key={item.id}
              img={item.img}
              title={item.title}
              mainTitle={item.mainTitle}
              price={item.price} />
          ))}
        </Slider>
      </div>      
    </div>

  )
};



export default CarouselImg;
