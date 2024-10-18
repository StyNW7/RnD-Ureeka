"use client"
import { db, auth } from "@/lib/firebase/init"
import React, { useState, useEffect, useCallback } from "react"
import { limit, getDocs, query, where, collection, getCountFromServer, Query, orderBy, startAfter, DocumentSnapshot } from "firebase/firestore"
import {LuArrowLeftFromLine, LuArrowRightFromLine, LuPlusSquare} from "react-icons/lu"
import CatsCard from "@/components/ui/forShopPage/CatsCard"

interface CatsProps{
    id:string,
    breed: string,
    multiplier: number,
    price:number,
    name: string,
    picture: string
}

interface StateProps{
    setselection: (e:number)=>void
}

const CatLoad: React.FC<StateProps> = ({setselection})=>{

    const collectionref = collection(db, "cats");
    // const countquery = query(collectionref);

    const [selectedsetoften, setselectedsetoften] = useState<number>(0);
    const [itemtot, setItemtot] = useState<number>(1);
    const [cats_item, setCats_item] = useState<CatsProps[]>([]); // need to query and stored in here
    const [searchstr, setSearchstr] = useState<string>(""); // for every change update the cats_item and itemtot
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageCursors, setPageCursors] = useState<DocumentSnapshot[]>([]); // Track cursor for each page
    const [selectedattr, setSelectedattr] = useState<keyof typeof attributes>("name");
    const [nothingFound, setnothingFound] = useState<boolean>(false);

    const attributes ={
        name: "str",
        breed: "str",
        multiplieru: "num+",
        multiplierd: "num-",
        picture: "str",
        priceu: "num+",
        priced: "num-",
    }

    const updates = useCallback(async () => {
        if (isLoading) return;      

        console.log("Searched q:", searchstr);

        let newq:Query|null = null;

        if(attributes[selectedattr] === "str"){
            const strq = searchstr.replace(/\b\w/g, c => c.toUpperCase());
            newq = strq.length > 0 ? 
                query(collectionref, 
                    where(selectedattr, ">=", strq),
                    where(selectedattr, "<", strq + "\uf8ff"),
                    orderBy(selectedattr, "asc")
                ) 
            :
                query(collectionref, orderBy("name", "asc"));
          
        } else if(attributes[selectedattr] === "num+"){
            const strq = parseFloat(searchstr);
            const attr = selectedattr.slice(0, -1);
            newq = strq > 0 ? 
                query(collectionref, 
                    where(attr, ">=", strq),
                    orderBy(attr, "asc")
                ) 
            :
                query(collectionref, orderBy(attr, "asc"));
          
        } else if(attributes[selectedattr] === "num-"){
            const strq = parseFloat(searchstr);
            const attr = selectedattr.slice(0, -1);
            newq = strq > 0 ? 
                query(collectionref, 
                    where(attr, "<=", strq),
                    orderBy(attr, "asc")
                ) 
            :
                query(collectionref, orderBy(attr, "asc"));
        } else {
            const isnum = !isNaN(Number(searchstr));
            const strq = isnum ? parseFloat(searchstr) : searchstr;
            if(isnum){
                newq = strq as number > 0 ? 
                    query(collectionref, 
                        where(selectedattr, "==", strq),
                        orderBy(selectedattr, "asc")
                    ) 
                :
                    query(collectionref, orderBy("name", "asc"));
            } else {
                newq = (strq as string).length > 0 ? 
                    query(collectionref, 
                        where(selectedattr, ">=", strq),
                        where(selectedattr, "<", strq + "\uf8ff"),
                        orderBy(selectedattr, "asc")
                    ) 
                :
                    query(collectionref, orderBy("name", "asc"));
            }
        }
            
        const newqdisp = (selectedsetoften === 0 || pageCursors.length === 0) ? 
            query(newq, limit(10)) 
            : 
            query(newq,
            startAfter(pageCursors[selectedsetoften - 1]),
            limit(10)
        )
      
        try {
            console.log("User's id is: "+auth.currentUser?.uid);

            const snapshot = await getCountFromServer(newq); // Fetch only the count of documents
            const count = snapshot.data().count;
            if(count==0){ 
                setnothingFound(true);
                setTimeout(() => {
                    setnothingFound(false);
                }, 5000);
            }
            setItemtot(Math.ceil(count / 10));
            console.log("Total item/10: " + itemtot + " from " + count);
            
            const snapshotdata = await getDocs(newqdisp);
            const newCatItems: CatsProps[] = snapshotdata.docs.map((items) => ({ id: items.id, ...items.data() }) as CatsProps);
            
          if (newCatItems.length > 0) {
            setCats_item(newCatItems);
            setLastVisible(snapshotdata.docs[snapshotdata.docs.length - 1]);

            if(!pageCursors[selectedsetoften]){
                setPageCursors((prevcursor)=>[...prevcursor, snapshotdata.docs[snapshotdata.docs.length-1]])
            }
          }
          console.log("Cats object:", newCatItems);
          console.log("Cats retreived:",newCatItems.length);
      
        } catch (error) {
          console.error("Error counting documents: " + error);
        }
      }, [
        isLoading,
        setIsLoading,
        collectionref,
        searchstr,
        selectedsetoften,
        pageCursors,
        auth,
        selectedattr,
        setCats_item,
        setLastVisible,
        setItemtot,
        setSelectedattr,
      ]);

    const trigsearch = ()=>{
        setselectedsetoften(0);
        setIsLoading(true);
        console.log("trig trig");
        updates()
        .catch((e)=>{console.log("Error fetching item: " + e);})
        .finally(()=>{setIsLoading(false)});
    }
    
    
    useEffect(() => {
        setIsLoading(true);
        console.log("trig useff");
        updates()
            .catch((e)=>console.log("Error fetching item: " + e))
            .finally(()=>{
                setIsLoading(false);
            });

    }, [selectedsetoften]); // Add getDocLen to the dependency array


    useEffect(()=>{
        console.log("Search:", searchstr);
    }, [searchstr]);

    return (
        <>
            <div className="my-4 w-full flex justify-center">
                <select
                    value={selectedattr}
                    onChange={(e) => setSelectedattr(e.target.value as keyof typeof attributes)}
                    className="px-4 py-2 mr-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                >
                    <option value="name">Name</option>
                    <option value="breed">Breed</option>
                    <option value="priceu">Price Up</option>
                    <option value="priced">Price Down</option>
                </select>
                <input
                    type="text"
                    placeholder="Search Cat Names..."
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold"
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
            <ul className="flex justify-center gap-6 my-16">
                {!isLoading ? 
                        cats_item.map((item)=>(
                            <li key={item.id}>
                                <CatsCard 
                                    img={item.picture}
                                    desc={item.breed}
                                    price={item.price}
                                    title={item.name}
                                />
                            </li>
                            )
                        )
                    :
                        <div className="flex justify-center items-center h-40">
                            <p className="text-3xl font-bold text-orange-500 animate-pulse">
                                Loading...
                            </p>
                        </div>
                }
            </ul>
            <div>
                <div className="flex items-center justify-center space-x-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-2xl py-2 px-4 mr-2 rounded-full"
                        onClick={()=>setselectedsetoften(selectedsetoften-1 >= 0 ? selectedsetoften-1 : selectedsetoften)}
                    >
                        <LuArrowLeftFromLine />
                    </button>

                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften-1 > 0 ? "bg-orange-300" : "pointer-events-none" }`} 
                        onClick={()=>{setselectedsetoften(selectedsetoften-1 > 0 ? selectedsetoften-1 : 0)}}>
                            { selectedsetoften-1 > 0 ? selectedsetoften : <></> }
                    </button>
                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften > 0 ? "bg-orange-300" : "pointer-events-none" }`} 
                        onClick={()=>{setselectedsetoften(selectedsetoften > 0 ? selectedsetoften : 0)}}>
                            { selectedsetoften > 0 ? selectedsetoften+1 : <></> }
                    </button>

                    
                    <button className="w-12 h-12 bg-orange-300 rounded-full">{ selectedsetoften+1 }</button>
                    
                    
                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften+1 < itemtot ? "bg-orange-300" : "pointer-events-none" }`}
                        onClick={()=>setselectedsetoften(selectedsetoften+1 < itemtot ? selectedsetoften+1 : selectedsetoften)}>
                            { selectedsetoften+1 < itemtot ? selectedsetoften+3 : <></> }
                    </button>

                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften+2 < itemtot ? "bg-orange-300" : "pointer-events-none" }`}
                        onClick={()=>setselectedsetoften(selectedsetoften+2 < itemtot ? selectedsetoften+2 : selectedsetoften)}>
                            { selectedsetoften+2 < itemtot ? selectedsetoften+4 : <></> }
                    </button>
                    
                    
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-2xl py-2 px-4 ml-2 rounded-full" 
                        onClick={()=>setselectedsetoften(selectedsetoften+1 < itemtot ? selectedsetoften+1 : selectedsetoften)}
                    >
                        <LuArrowRightFromLine />
                    </button>
                </div>
            </div>
        </>
    )
}


export default CatLoad;