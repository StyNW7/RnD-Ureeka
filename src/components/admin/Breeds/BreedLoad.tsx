"use client"
import { db, auth } from "@/lib/firebase/init"
import React, { useState, useEffect, useCallback } from "react"
import { limit, getDocs, query, where, collection, getCountFromServer, Query, orderBy, startAfter, DocumentSnapshot, getDoc } from "firebase/firestore"
import {LuArrowLeftFromLine, LuArrowRightFromLine, LuPlusSquare, LuLoader2} from "react-icons/lu"
import { BreedAttributes, BreedAttributesType, querySortBuilder, UserAttributes, CatsAttributes } from "@/components/admin/BackEnd/utils"
import BreedCard from "@/components/ui/BreedCard"

interface StateProps{
    setselection: (e:number)=>void
    setObjectPlaceHolder:React.Dispatch<React.SetStateAction<CatsAttributes|UserAttributes|BreedAttributes|null>>
}

const BreedLoad: React.FC<StateProps> = ({setselection, setObjectPlaceHolder})=>{

    const collectionref = collection(db, "breed");

    const [selectedsetoften, setselectedsetoften] = useState<number>(0);
    const [itemtot, setItemtot] = useState<number>(1);
    const [breed_item, setbreed_item] = useState<BreedAttributes[]>([]); // need to query and stored in here
    const [searchstr, setSearchstr] = useState<string>(""); // for every change update the breed_item and itemtot
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cursors, setCursors] = useState<(DocumentSnapshot | null)[]>([null]);
    const [selectedattr, setSelectedattr] = useState<keyof typeof BreedAttributesType>("name");
    const [nothingFound, setnothingFound] = useState<boolean>(false);


    const updates = useCallback(async () => {
        
        if (isLoading) return;     
        
        setIsLoading(true);

        const newq:Query|null = querySortBuilder(collectionref, BreedAttributesType, selectedattr, searchstr);

        let newqdisp:Query;
        
        if (selectedsetoften === 0 || !cursors[selectedsetoften]) {
            newqdisp = query(newq, limit(10));
        } else {
            newqdisp = query(newq, startAfter(cursors[selectedsetoften]), limit(10));
        }
      
        try {
            
            const snapshotdata = await getDocs(newqdisp);
            const newBreedItems: BreedAttributes[] = snapshotdata.docs.map((items) => ({ id: items.id, ...items.data() }) as BreedAttributes);
            
            if (newBreedItems.length > 0) {
                setbreed_item(newBreedItems);
                const lastDoc = snapshotdata.docs[snapshotdata.docs.length - 1];
                setCursors(prev => {
                    const newCursors = [...prev];
                    newCursors[selectedsetoften + 1] = lastDoc;
                    return newCursors;
                });
            } else {
                console.log("breed not retrieved, Connection problem ?");
                // let iterable = 0;
                // while(true){
                //     iterable++;
                // }
            }

            console.log("breed retreived:", newBreedItems.length);

            // total count/10 for indexing pages
            const snapshot = await getCountFromServer(newq);
            const count = snapshot.data().count;
            if (count == 0) { 
                setnothingFound(true);
                setTimeout(() => {
                    setnothingFound(false);
                }, 5000);
            }
            setItemtot(Math.ceil(count / 10));      
        } catch (error) {
            console.error("Error counting documents: " + error);
        }
      }, [
        isLoading,
        setIsLoading,
        collectionref,
        searchstr,
        selectedsetoften,
        cursors,
        setCursors,
        auth,
        selectedattr,
        setbreed_item,
        setItemtot,
        setSelectedattr,
        setselectedsetoften
      ]);

    const trigsearch = ()=>{
        setselectedsetoften(0);
        // setIsLoading(true);
        updates()
        .catch((e)=>{console.log("Error fetching item: " + e);})
        .finally(()=>{setIsLoading(false)});
    }
    
    
    useEffect(() => {
        // setIsLoading(true);
        updates()
            .catch((e)=>console.log("Error fetching item: ", e))
            .finally(()=>{
                setIsLoading(false);
            });

    }, [selectedsetoften]); // Add getDocLen to the dependency array

    const handlePreviousPage = () => {
        if (selectedsetoften > 0) {
            setselectedsetoften(selectedsetoften - 1);
        }
    };


    const handleNextPage = () => {
        if (selectedsetoften + 1 < itemtot) {
            setselectedsetoften(selectedsetoften + 1);
        }
    };

    return (
        <>
            <div className="my-4 w-full flex justify-center">
                <select
                    value={selectedattr}
                    onChange={(e) => setSelectedattr(e.target.value as keyof typeof BreedAttributesType)}
                    className="px-4 py-2 mr-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold dark:bg-gray-800"
                >
                    <option value="name">Name</option>
                    <option value="origin">Origin</option>
                </select>
                <input
                    type="text"
                    placeholder="Search Breed Names..."
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold dark:bg-gray-800"
                    value={searchstr}
                    onChange={(e) => setSearchstr(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter'){trigsearch()}}}
                />
                <button id="breedsel" onClick={()=>setselection(4)} className={`px-6 py-2 ml-4 min-w-fit flex items-center gap-3 text-center text-white bg-green-600 border border-green-600 rounded-full active:text-green-500 hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring`}>
                    Create <LuPlusSquare />
                </button>
            </div>
            {nothingFound && (
                //transition-opacity duration-1000 opacity-0 animate-fadeOut
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Ooh No!</strong>
                    <span className="block sm:inline"> {searchstr} not found</span>
                </div>
            )}
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <LuLoader2 className="animate-spin text-4xl text-orange-500 " />
                    <div className="flex justify-center items-center h-40 ml-4">
                        <p className="text-4xl font-bold text-orange-500 animate-pulse">
                            Loading...
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <ul className={`flex justify-center gap-6 mt-16 ${breed_item.length <= 5 ? "mb-16" : ""}`}>
                        {breed_item.slice(0, 5).map((item) => (
                            <li key={item.id} onClick={()=>{setObjectPlaceHolder(item);setselection(5)}}>
                                <BreedCard 
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    origin = {item.origin}
                                />
                            </li>
                        ))}
                    </ul>
                    {breed_item.length > 5 && (
                        <>
                            <br />
                            <ul className="flex justify-center gap-6 mb-16">
                                {breed_item.slice(5).map((item) => (
                                    <li key={item.id} onClick={()=>{setObjectPlaceHolder(item);setselection(5)}}>
                                        <BreedCard 
                                            id={item.id}
                                            name={item.name}
                                            description={item.description}
                                            origin = {item.origin}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    
                    
                        <div className="flex items-center justify-center space-x-4 mb-12">
                            <button 
                                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-2xl py-2 px-4 mr-2 rounded-full"
                                onClick={handlePreviousPage}
                                disabled={selectedsetoften === 0}
                            >
                                <LuArrowLeftFromLine />
                            </button>

                            <span className="text-lg font-bold">Page {selectedsetoften + 1} out of {itemtot}</span>

                            <button 
                                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-2xl py-2 px-4 ml-2 rounded-full" 
                                onClick={handleNextPage}
                                disabled={selectedsetoften + 1 >= itemtot}
                            >
                                <LuArrowRightFromLine />
                            </button>
                        </div>
                </>
            )}
        </>
    )
}


export default BreedLoad;
