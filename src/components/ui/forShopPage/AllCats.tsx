import React, { useEffect, useState } from 'react';
import CatsCard from './CatsCard';
import { query, collection, where, Query, getDoc, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';
import { CatsAttributes } from '@/components/admin/BackEnd/utils';
import { LuLoader2 } from 'react-icons/lu';

const AllCatsData = [
  {
    img: "/carousel-cats/ash/1.jpg",
    title: "ASH",
    desc: "American Shorthair",
    price: 9694851,
},
{
    img: "/carousel-cats/bsh/1.jpg",
    title: "BSH",
    desc: "British Shorthair",
    price: 2636437,
},
{
    img: "/carousel-cats/munchkin/1.jpg",
    title: "MUNCHKIN",
    desc: "Munchkin",
    price: 2797920,
},
{
    img: "/carousel-cats/ragdoll/1.jpg",
    title: "RAGDOLL",
    desc: "Ragdoll",
    price: 2743219,
},
{
    img: "/carousel-cats/siamese/1.jpg",
    title: "SIAMESE",
    desc: "Siamese",
    price: 4723560,
},
{
    img: "/carousel-cats/blh/1.jpg",
    title: "BLH",
    desc: "British Longhair",
    price: 8555423,
},
{
  img: "/carousel-cats/scottish/1.jpg",
  title: "SCOTTISH",
  desc: "Scottish Fold",
  price: 4986368,
},
{
  img: "/carousel-cats/ash/2.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 5160134,
},
{
  img: "/carousel-cats/bsh/2.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 8888867,
},
{
  img: "/carousel-cats/munchkin/2.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 8310609,
},
{
  img: "/carousel-cats/ragdoll/2.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 3939954,
},
{
  img: "/carousel-cats/siamese/2.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 9973005,
},
{
  img: "/carousel-cats/blh/2.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 4117966,
},
{
img: "/carousel-cats/scottish/2.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 6322138,
},
{
  img: "/carousel-cats/ash/3.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 8345584,
},
{
  img: "/carousel-cats/bsh/3.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 6141560,
},
{
  img: "/carousel-cats/munchkin/3.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 4849144,
},
{
  img: "/carousel-cats/ragdoll/3.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 5473087,
},
{
  img: "/carousel-cats/siamese/3.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 4298513,
},
{
  img: "/carousel-cats/blh/3.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 5919603,
},
{
img: "/carousel-cats/scottish/3.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 3133916,
},
{
  img: "/carousel-cats/ash/4.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 9628400,
},
{
  img: "/carousel-cats/bsh/4.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 8127718,
},
{
  img: "/carousel-cats/munchkin/4.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price:  6171347
},
{
  img: "/carousel-cats/ragdoll/4.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 5439684,
},
{
  img: "/carousel-cats/siamese/4.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 8194074,
},
{
  img: "/carousel-cats/blh/4.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 2271230,
},
{
img: "/carousel-cats/scottish/4.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price:  3583113
},
{
  img: "/carousel-cats/ash/5.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 7662000,
},
{
  img: "/carousel-cats/bsh/5.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 3378132,
},
{
  img: "/carousel-cats/munchkin/5.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 5449049,
},
{
  img: "/carousel-cats/ragdoll/5.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 6159809,
},
{
  img: "/carousel-cats/siamese/5.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 3513571,
},
{
  img: "/carousel-cats/blh/5.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 2302587,
},
{
img: "/carousel-cats/scottish/5.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 5789377,
},
{
  img: "/carousel-cats/ash/6.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 8854304,
},
{
  img: "/carousel-cats/bsh/6.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 6904486,
},
{
  img: "/carousel-cats/munchkin/6.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 8446076,
},
{
  img: "/carousel-cats/ragdoll/6.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 6143252,
},
{
  img: "/carousel-cats/siamese/6.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 5759774,
},
{
  img: "/carousel-cats/blh/6.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 7815696,
},
{
img: "/carousel-cats/scottish/6.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 5848413,
},
{
  img: "/carousel-cats/ash/7.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 8430648,
},
{
  img: "/carousel-cats/bsh/7.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 8703416,
},
{
  img: "/carousel-cats/munchkin/7.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 7740652,
},
{
  img: "/carousel-cats/ragdoll/7.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 7900541,
},
{
  img: "/carousel-cats/siamese/7.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 4187049,
},
{
  img: "/carousel-cats/blh/7.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 7404634,
},
{
img: "/carousel-cats/scottish/7.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 9503879,
},
{
  img: "/carousel-cats/ash/8.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 7613696,
},
{
  img: "/carousel-cats/bsh/8.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 9145665,
},
{
  img: "/carousel-cats/munchkin/8.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 9517071,
},
{
  img: "/carousel-cats/ragdoll/8.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 5563578,
},
{
  img: "/carousel-cats/siamese/8.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 4481773,
},
{
  img: "/carousel-cats/blh/8.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 2889844,
},
{
img: "/carousel-cats/scottish/8.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 5136268,
},
{
  img: "/carousel-cats/ash/9.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 5965245,
},
{
  img: "/carousel-cats/bsh/9.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 3668637,
},
{
  img: "/carousel-cats/munchkin/9.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 2615934,
},
{
  img: "/carousel-cats/ragdoll/9.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 3497677,
},
{
  img: "/carousel-cats/siamese/9.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 9935024,
},
{
  img: "/carousel-cats/blh/9.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 2161025,
},
{
img: "/carousel-cats/scottish/9.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 4544797,
},
{
  img: "/carousel-cats/ash/10.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 4320141,
},
{
  img: "/carousel-cats/bsh/10.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 2857908,
},
{
  img: "/carousel-cats/munchkin/10.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 9369655,
},
{
  img: "/carousel-cats/ragdoll/10.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 8375191,
},
{
  img: "/carousel-cats/siamese/10.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 2616437,
},
{
  img: "/carousel-cats/blh/10.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 9783370,
},
{
img: "/carousel-cats/scottish/10.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 2966649,
},
{
  img: "/carousel-cats/ash/11.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 7461428,
},
{
  img: "/carousel-cats/bsh/11.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 9710635,
},
{
  img: "/carousel-cats/munchkin/11.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 9539977,
},
{
  img: "/carousel-cats/ragdoll/11.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 5446456,
},
{
  img: "/carousel-cats/siamese/11.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 8732528,
},
{
  img: "/carousel-cats/blh/11.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 8480350,
},
{
img: "/carousel-cats/scottish/11.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 4005894,
},
{
  img: "/carousel-cats/ash/12.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 4807796,
},
{
  img: "/carousel-cats/bsh/12.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 3258301,
},
{
  img: "/carousel-cats/munchkin/12.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 2401091,
},
{
  img: "/carousel-cats/ragdoll/12.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 7306567,
},
{
  img: "/carousel-cats/siamese/12.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 4028979,
},
{
  img: "/carousel-cats/blh/12.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 4825286,
},
{
img: "/carousel-cats/scottish/12.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 8295063,
},
{
  img: "/carousel-cats/ash/13.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 7308865,
},
{
  img: "/carousel-cats/bsh/13.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 3310868,
},
{
  img: "/carousel-cats/munchkin/13.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 7267291,
},
{
  img: "/carousel-cats/ragdoll/13.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 4268759,
},
{
  img: "/carousel-cats/siamese/13.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 2853718,
},
{
  img: "/carousel-cats/blh/13.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 5349000,
},
{
img: "/carousel-cats/scottish/13.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 4706758,
},
{
  img: "/carousel-cats/ash/14.jpg",
  title: "ASH",
  desc: "American Shorthair",
  price: 8160998,
},
{
  img: "/carousel-cats/bsh/14.jpg",
  title: "BSH",
  desc: "British Shorthair",
  price: 4275776,
},
{
  img: "/carousel-cats/munchkin/14.jpg",
  title: "MUNCHKIN",
  desc: "Munchkin",
  price: 9669441,
},
{
  img: "/carousel-cats/ragdoll/14.jpg",
  title: "RAGDOLL",
  desc: "Ragdoll",
  price: 6495000,
},
{
  img: "/carousel-cats/siamese/14.jpg",
  title: "SIAMESE",
  desc: "Siamese",
  price: 7836716,
},
{
  img: "/carousel-cats/blh/14.jpg",
  title: "BLH",
  desc: "British Longhair",
  price: 2295359,
},
{
img: "/carousel-cats/scottish/14.jpg",
title: "SCOTTISH",
desc: "Scottish Fold",
price: 6169716,
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

interface AllCatsProps{
  selectedBreed: string|null;
}

const AllCats:React.FC<AllCatsProps> = ({selectedBreed}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cats, setCats] = useState<CatsAttributes[]>([]);
  const [order, setorder] = useState<"asc"|"desc">("asc");

  const updates = async(q:Query)=>{
    try{
      const cat = await getDocs(q);
      setCats([]);
      cat.docs.forEach((e)=>{
        setCats(prevcats=>[...prevcats, {id:e.id, ...e.data()} as CatsAttributes])
      });
    } catch(e){
      console.error(e);
    }
  }
  
  useEffect(()=>{
    setIsLoading(true);
    if(!selectedBreed){
      const q = query(collection(db, "cats"), orderBy("name", order));
      updates(q)
        .catch(e=>console.log(e))
        .finally(()=>setIsLoading(false));
      return;
    }
    const q = query(collection(db, "cats"), where("breed", "==", selectedBreed));
    updates(q)
      .catch(e=>console.log(e))
      .finally(()=>setIsLoading(false));
  }, [
    selectedBreed
  ])

  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-xl pb-4">
          {selectedBreed ? `${selectedBreed} CATS` : 'ALL CATS'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 border justify-items-center">
          {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <LuLoader2 className="animate-spin text-4xl text-orange-500 " />
                    <div className="flex justify-center items-center h-40 ml-4">
                        <p className="text-4xl font-bold text-orange-500 animate-pulse">
                            Loading...
                        </p>
                    </div>
                </div>
            ) : (cats.map((item) => (
              <CatsCard
                key={item.id}
                img={item.picture}
                title={item.name}
                desc={item.breed}
                price={item.price}
              />
            )))
          }
          
        </div>
      </div>
    </div>
  );
};

export default AllCats;
