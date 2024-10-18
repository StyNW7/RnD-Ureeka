import React from 'react';
import CatsCard from './CatsCard';

const AllCatsData = [
  {
    img: "/carousel-cats/ash/1.jpg",
    title: "ASH",
    desc: "American Shorthair",
    price: "9.694.851",
},
{
    img: "/carousel-cats/bsh/1.jpg",
    title: "BSH",
    desc: "British Shorthair",
    price: "2.636.437",
},
{
    img: "/carousel-cats/munchkin/1.jpg",
    title: "MUNCHKIN",
    desc: "Munchkin",
    price: "2.797.920",
},
{
    img: "/carousel-cats/ragdoll/1.jpg",
    title: "RAGDOLL",
    desc: "Ragdoll",
    price: "2.743.219",
},
{
    img: "/carousel-cats/siamese/1.jpg",
    title: "SIAMESE",
    desc: "Siamese",
    price: "4.723.560",
},
{
    img: "/carousel-cats/blh/1.jpg",
    title: "BLH",
    desc: "British Longhair",
    price: "8.555.423",
},
{
  img: "/carousel-cats/scottish/1.jpg",
  title: "SCOTTISH",
  desc: "Scottish Fold",
  price: "4.986.368",
},
{
  img: "/carousel-cats/ash/2.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "5.160.134",
},
{
  img: "/carousel-cats/bsh/2.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "8.888.867",
},
{
  img: "/carousel-cats/munchkin/2.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "8.310.609",
},
{
  img: "/carousel-cats/ragdoll/2.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "3.939.954",
},
{
  img: "/carousel-cats/siamese/2.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "9.973.005",
},
{
  img: "/carousel-cats/blh/2.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "4.117.966",
},
{
img: "/carousel-cats/scottish/2.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "6.322.138",
},
{
  img: "/carousel-cats/ash/3.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "8.345.584",
},
{
  img: "/carousel-cats/bsh/3.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "6.141.560",
},
{
  img: "/carousel-cats/munchkin/3.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "4.849.144",
},
{
  img: "/carousel-cats/ragdoll/3.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "5.473.087",
},
{
  img: "/carousel-cats/siamese/3.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "4.298.513",
},
{
  img: "/carousel-cats/blh/3.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "5.919.603",
},
{
img: "/carousel-cats/scottish/3.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "3.133.916",
},
{
  img: "/carousel-cats/ash/4.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "9.628.400",
},
{
  img: "/carousel-cats/bsh/4.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "8.127.718",
},
{
  img: "/carousel-cats/munchkin/4.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: " 6.171.476",
},
{
  img: "/carousel-cats/ragdoll/4.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "5.439.684",
},
{
  img: "/carousel-cats/siamese/4.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "8.194.074",
},
{
  img: "/carousel-cats/blh/4.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "2.271.230",
},
{
img: "/carousel-cats/scottish/4.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: " 9.583.316",
},
{
  img: "/carousel-cats/ash/5.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "7.662.000",
},
{
  img: "/carousel-cats/bsh/5.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "3.378.132",
},
{
  img: "/carousel-cats/munchkin/5.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "5.449.049",
},
{
  img: "/carousel-cats/ragdoll/5.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "6.159.809",
},
{
  img: "/carousel-cats/siamese/5.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "3.513.571",
},
{
  img: "/carousel-cats/blh/5.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "2.302.587",
},
{
img: "/carousel-cats/scottish/5.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "5.789.377",
},
{
  img: "/carousel-cats/ash/6.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "8.854.304",
},
{
  img: "/carousel-cats/bsh/6.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "6.904.486",
},
{
  img: "/carousel-cats/munchkin/6.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "8.446.076",
},
{
  img: "/carousel-cats/ragdoll/6.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "6.143.252",
},
{
  img: "/carousel-cats/siamese/6.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "5.759.774",
},
{
  img: "/carousel-cats/blh/6.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "7.815.696",
},
{
img: "/carousel-cats/scottish/6.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "5.848.413",
},
{
  img: "/carousel-cats/ash/7.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "8.430.648",
},
{
  img: "/carousel-cats/bsh/7.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "8.703.416",
},
{
  img: "/carousel-cats/munchkin/7.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "7.740.652",
},
{
  img: "/carousel-cats/ragdoll/7.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "7.900.541",
},
{
  img: "/carousel-cats/siamese/7.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "4.187.049",
},
{
  img: "/carousel-cats/blh/7.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "7.404.634",
},
{
img: "/carousel-cats/scottish/7.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "9.503.879",
},
{
  img: "/carousel-cats/ash/8.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "7.613.696",
},
{
  img: "/carousel-cats/bsh/8.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "9.145.665",
},
{
  img: "/carousel-cats/munchkin/8.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "9.517.071",
},
{
  img: "/carousel-cats/ragdoll/8.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "5.563.578",
},
{
  img: "/carousel-cats/siamese/8.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "4.481.773",
},
{
  img: "/carousel-cats/blh/8.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "2.889.844",
},
{
img: "/carousel-cats/scottish/8.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "5.136.268",
},
{
  img: "/carousel-cats/ash/9.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "5.965.245",
},
{
  img: "/carousel-cats/bsh/9.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "3.668.637",
},
{
  img: "/carousel-cats/munchkin/9.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "2.615.934",
},
{
  img: "/carousel-cats/ragdoll/9.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "3.497.677",
},
{
  img: "/carousel-cats/siamese/9.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "9.935.024",
},
{
  img: "/carousel-cats/blh/9.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "2.161.025",
},
{
img: "/carousel-cats/scottish/9.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "4.544.797",
},
{
  img: "/carousel-cats/ash/10.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "4.320.141",
},
{
  img: "/carousel-cats/bsh/10.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "2.857.908",
},
{
  img: "/carousel-cats/munchkin/10.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "9.369.655",
},
{
  img: "/carousel-cats/ragdoll/10.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "8.375.191",
},
{
  img: "/carousel-cats/siamese/10.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "2.616.437",
},
{
  img: "/carousel-cats/blh/10.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "9.783.370",
},
{
img: "/carousel-cats/scottish/10.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "2.966.649",
},
{
  img: "/carousel-cats/ash/11.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "7.461.428",
},
{
  img: "/carousel-cats/bsh/11.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "9.710.635",
},
{
  img: "/carousel-cats/munchkin/11.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "9.539.977",
},
{
  img: "/carousel-cats/ragdoll/11.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "5.446.456",
},
{
  img: "/carousel-cats/siamese/11.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "8.732.528",
},
{
  img: "/carousel-cats/blh/11.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "8.480.350",
},
{
img: "/carousel-cats/scottish/11.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "4.005.894",
},
{
  img: "/carousel-cats/ash/12.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "4.807.796",
},
{
  img: "/carousel-cats/bsh/12.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "3.258.301",
},
{
  img: "/carousel-cats/munchkin/12.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "2.401.091",
},
{
  img: "/carousel-cats/ragdoll/12.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "7.306.567",
},
{
  img: "/carousel-cats/siamese/12.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "4.028.979",
},
{
  img: "/carousel-cats/blh/12.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "4.825.286",
},
{
img: "/carousel-cats/scottish/12.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "8.295.063",
},
{
  img: "/carousel-cats/ash/13.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "7.308.865",
},
{
  img: "/carousel-cats/bsh/13.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "3.310.868",
},
{
  img: "/carousel-cats/munchkin/13.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "7.267.291",
},
{
  img: "/carousel-cats/ragdoll/13.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "4.268.759",
},
{
  img: "/carousel-cats/siamese/13.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "2.853.718",
},
{
  img: "/carousel-cats/blh/13.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "5.349.000",
},
{
img: "/carousel-cats/scottish/13.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "4.706.758",
},
{
  img: "/carousel-cats/ash/14.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: "8.160.998",
},
{
  img: "/carousel-cats/bsh/14.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: "4.275.776",
},
{
  img: "/carousel-cats/munchkin/14.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: "9.669.441",
},
{
  img: "/carousel-cats/ragdoll/14.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: "6.495.000",
},
{
  img: "/carousel-cats/siamese/14.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: "7.836.716",
},
{
  img: "/carousel-cats/blh/14.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: "2.295.359",
},
{
img: "/carousel-cats/scottish/14.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: "6.169.716",
},
];

// const AllCats = () => {
//     return (
//       <div>
//         <div className='container pt-16'>
//           {/* <h2 className='font-medium text-xl pb-4'>ALL CATS</h2> */}
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10'>
//             {AllCatsData.map((item, index) => (
//               <CatsCard
//                 key={index}
//                 img={item.img}
//                 title={item.title}
//                 desc={item.desc}
//                 price={item.price}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

// export default AllCats

const AllCats = ({selectedBreed, allCatsData}) => {
  const filteredCats = selectedBreed
    ? allCatsData.filter((cat) => cat.title === selectedBreed)
    : allCatsData;

  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-xl pb-4">
          {selectedBreed ? `${selectedBreed} CATS` : 'ALL CATS'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {filteredCats.map((item, index) => (
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
};

export default AllCats;
