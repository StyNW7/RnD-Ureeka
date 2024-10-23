"use client"
import { db, auth } from "@/lib/firebase/init"
import React, { useState, useEffect, useCallback } from "react"
import { limit, getDocs, query, where, collection, getCountFromServer, Query, orderBy, startAfter, DocumentSnapshot, getDoc } from "firebase/firestore"
import {LuArrowLeftFromLine, LuArrowRightFromLine, LuPlusSquare, LuLoader2} from "react-icons/lu"
import CatsCard from "@/components/ui/forShopPage/CatsCard"
import { CatsAttributes, CatsAttributeType, querySortBuilder } from "@/components/admin/BackEnd/utils"

interface StateProps{
    setselection: (e:number)=>void
    setidPlaceHolder:(e:string|null)=>void
}

const CatLoad: React.FC<StateProps> = ({setselection, setidPlaceHolder})=>{

    const collectionref = collection(db, "cats");
    // const countquery = query(collectionref);

    const [selectedsetoften, setselectedsetoften] = useState<number>(0);
    const [itemtot, setItemtot] = useState<number>(1);
    const [cats_item, setCats_item] = useState<CatsAttributes[]>([]); // need to query and stored in here
    const [searchstr, setSearchstr] = useState<string>(""); // for every change update the cats_item and itemtot
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cursors, setCursors] = useState<(DocumentSnapshot | null)[]>([null]);
    const [selectedattr, setSelectedattr] = useState<keyof typeof CatsAttributeType>("name");
    const [nothingFound, setnothingFound] = useState<boolean>(false);



    const updates = useCallback(async () => {
        
        if (isLoading) return;      

        const newq:Query = querySortBuilder(collectionref, CatsAttributeType, selectedattr, searchstr);


        let newqdisp:Query;
        
        if (selectedsetoften === 0 || !cursors[selectedsetoften]) {
            newqdisp = query(newq, limit(10));
        } else {
            newqdisp = query(newq, startAfter(cursors[selectedsetoften]), limit(10));
        }
        
        // console.log("Query for display: ", newqdisp);

        try {
            
            const snapshotdata = await getDocs(newqdisp);
            console.log(snapshotdata);
            const newCatItems: CatsAttributes[] = snapshotdata.docs.map((items) => ({ id: items.id, ...items.data() }) as CatsAttributes);
            
            if (newCatItems.length > 0) {
                setCats_item(newCatItems);
                const lastDoc = snapshotdata.docs[snapshotdata.docs.length - 1];
                setCursors(prev => {
                    const newCursors = [...prev];
                    newCursors[selectedsetoften + 1] = lastDoc;
                    return newCursors;
                });
            } else {
                console.log("Cats not retrieved, Connection problem ?");
                // let iterable = 0;
                // while(true){
                //     iterable++;
                // }
            }

            console.log("Cats retreived:", newCatItems.length);

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
        setCats_item,
        setItemtot,
        setSelectedattr,
        setselectedsetoften
      ]);

    const trigsearch = ()=>{
        setselectedsetoften(0);
        setIsLoading(true);
        updates()
        .catch((e)=>{console.log("Error fetching item: " + e);})
        .finally(()=>{setIsLoading(false)});
    }
    
    
    useEffect(() => {
        setIsLoading(true);
        updates()
            .catch((e)=>console.log("Error fetching item: ", e))
            .finally(()=>{
                setIsLoading(false);
            });

    }, [selectedsetoften, selectedattr]); 

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
                    onChange={(e) => setSelectedattr(e.target.value as keyof typeof CatsAttributeType)}
                    className="px-4 py-2 mr-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold dark:bg-gray-800"
                >
                    <option value="name">Name</option>
                    <option value="breed">Breed</option>
                    <option value="priceu">Price Up</option>
                    <option value="priced">Price Down</option>
                </select>
                <input
                    type="text"
                    placeholder="Search Cat Names..."
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold dark:bg-gray-800"
                    value={searchstr}
                    onChange={(e) => setSearchstr(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter'){trigsearch()}}}
                />
                <button id="catsel" onClick={()=>setselection(1)} className={`px-6 py-2 ml-4 min-w-fit flex items-center gap-3 text-center text-white bg-green-600 border border-green-600 rounded-full active:text-green-500 hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring`}>
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
                    <ul className={`flex justify-center gap-6 mt-16 ${cats_item.length <= 5 ? "mb-16" : ""}`}>
                        {cats_item.slice(0, 5).map((item) => (
                            <li key={item.id} onClick={()=>{setidPlaceHolder(item.id);setselection(2)}}>
                                <CatsCard 
                                    img={item.picture}
                                    desc={item.breed}
                                    price={item.price}
                                    title={item.name}
                                />
                            </li>
                        ))}
                    </ul>
                    {cats_item.length > 5 && (
                        <>
                            <br />
                            <ul className="flex justify-center gap-6 mb-16">
                                {cats_item.slice(5).map((item) => (
                                    <li key={item.id} onClick={()=>{setidPlaceHolder(item.id);setselection(2)}}>
                                        <CatsCard 
                                            img={item.picture}
                                            desc={item.breed}
                                            price={item.price}
                                            title={item.name}
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


export default CatLoad;
