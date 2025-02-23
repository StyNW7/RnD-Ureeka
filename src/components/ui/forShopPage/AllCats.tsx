import React, { useEffect, useState } from 'react';
import CatsCard from './CatsCard';
import { query, collection, where, Query, getDoc, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';
import { CatsAttributes } from '@/components/admin/BackEnd/utils';
import { LuArrowDown, LuArrowUp, LuLoader2 } from 'react-icons/lu';
import BuyingModal from './BuyingModal';

interface AllCatsProps{
  selectedBreed: string|null;
  setNotif: React.Dispatch<React.SetStateAction<string|null>>
  setNotifStatus: React.Dispatch<React.SetStateAction<"warn"|"success">>
  setNotifMessage: React.Dispatch<React.SetStateAction<string>>
  setAnimateInOut: React.Dispatch<React.SetStateAction<"in"|"out">>
}

const AllCats:React.FC<AllCatsProps> = ({selectedBreed, setNotif, setNotifStatus, setAnimateInOut, setNotifMessage}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cats, setCats] = useState<CatsAttributes[]>([]);
  const [cat, setcat] = useState<CatsAttributes|null>(null);
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

  const toggleOrder = () => {
    setCats(prev => {
      const newArray = prev.slice();
      return newArray.reverse();
    });
    setorder(prev => prev === "asc" ? "desc" : "asc");
  };
  
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
    selectedBreed,
  ])

  return (
    <div>
      <div className="container pt-16">
        <div className='pb-4 flex items-center'>
          <h2 className="font-medium text-xl">
            {selectedBreed ? `${selectedBreed} CATS` : 'ALL CATS'}
          </h2>
          <button onClick={toggleOrder} className='border border-gray-400 rounded-lg text-lg p-2 ml-3'>
            {order === "asc" ? <LuArrowUp /> : <LuArrowDown/>}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 justify-items-center">
          {isLoading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <LuLoader2 className="animate-spin text-4xl text-orange-500 " />
                    <div className="flex justify-center items-center h-40 ml-4">
                        <p className="text-4xl font-bold text-orange-500 animate-pulse text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            ) : (cats.map((item) => (
              <div key={item.id} onClick={() => setcat(item)}>
              <CatsCard
                img={item.picture}
                title={item.name}
                desc={item.breed}
                price={item.price}
              />
            </div>
                        )))
          }
          
        </div>
      </div>
      {cat ? <BuyingModal 
            cat={cat}
            setcat={setcat}
            setNotif={setNotif}
            setNotifStatus={setNotifStatus}
            setCats={setCats}
            setAnimateInOut={setAnimateInOut}
            setNotifMessage={setNotifMessage}
          />
        : 
          <></>
        }
    </div>
  );
};

export default AllCats;
