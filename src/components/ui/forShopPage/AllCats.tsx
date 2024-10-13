import React from 'react';
import CatsCard from './CatsCard';

const AllCatsData = [
    {
        img: "/carousel-cats/ash/1.jpg",
        title: "ASH",
        desc: "American Shorthair",
        price: "2.170.000",
    },
    {
        img: "/carousel-cats/bsh/1.jpg",
        title: "BSH",
        desc: "British Shorthair",
        price: "8.118.000",
    },
    {
        img: "/carousel-cats/munchkin/1.jpg",
        title: "MUNCHKIN",
        desc: "Munchkin",
        price: "4.400.000",
    },
    {
        img: "/carousel-cats/ragdoll/1.jpg",
        title: "RAGDOLL",
        desc: "Ragdoll",
        price: "6.495.000",
    },
    {
        img: "/carousel-cats/siamese/1.jpg",
        title: "SIAMESE",
        desc: "Siamese",
        price: "5.804.000",
    },
    {
        img: "/carousel-cats/ash/2.jpg",
        title: "ASH",
        desc: "American Shorthair",
        price: "5.349.000",
    },
];

const AllCats = () => {
    return (
      <div>
        <div className='container pt-16'>
          {/* <h2 className='font-medium text-xl pb-4'>ALL CATS</h2> */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10'>
            {AllCatsData.map((item, index) => (
              <CatsCard
                key={index}
                img={item.img}
                title={item.title}
                desc={item.desc}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

export default AllCats
