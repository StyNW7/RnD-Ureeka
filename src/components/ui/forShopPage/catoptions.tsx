// import React from 'react';

// const catoptions = () => {
//   return (
//     <div className="hidden lg:block">
//       <div className="container">
//         <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish my-5">
//             <a className="navbar-link relative" href="#">
//                 SIAMESE
//             </a>
//             <a className="navbar-link relative" href="#">
//                 BSH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 RAGDOLL
//             </a>
//             <a className="navbar-link relative" href="#">
//                 MUNCHKIN
//             </a>
//             <a className="navbar-link relative" href="#">
//                 ASH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 SCOTTISH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 BLH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 ANIME
//             </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default catoptions;
"use client"
import { auth, db } from '@/lib/firebase/init';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { BreedAttributesType, querySortBuilder } from '@/components/admin/BackEnd/utils';
import { log } from 'console';
import HourGlass from '@/components/ui/hourGlass/hourGlass';


interface OptionProps{
  selectedBreed: string|null,
  setSelectedBreed: React.Dispatch<React.SetStateAction<string|null>>
}

const CatOptions:React.FC<OptionProps> = ({selectedBreed, setSelectedBreed}) => {
  const [breeds, setbreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const initialPromise = async ()=>{
    const q = query(collection(db, "breed"), orderBy("name", "asc"));
    try{
      const docSnapshot = await getDocs(q);
      setbreeds([]);
      docSnapshot.docs.forEach(element => {
        const dat = element.data();
        setbreeds(prevbreed=>[...prevbreed, dat.name as string]);
      });
      setIsLoading(false);
    } catch(e){
      console.error(e);
    }
  };
  
  useEffect(()=>{
    setIsLoading(true);
    initialPromise()
      .catch(e=>console.log(e));
  },[]);

    return (
      <div className="hidden lg:block">
        <div className="container">
          <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish my-5">
            {isLoading ? <p className='tracking-widest font-bold text-2xl'>Loading ...</p> : 
              breeds.map((breed) => (
              <p
                key={breed}
                className={`navbar-link relative cursor-pointer ${ selectedBreed === breed ? "text-orange-600" : ""}`}
                onClick={() => setSelectedBreed(breed)}
              >
                {breed}
              </p>
              ))
            }
          </div>
        </div>
      </div>
    );
  }


export default CatOptions;
