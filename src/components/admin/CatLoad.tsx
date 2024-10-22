"use client"
import { db, auth } from "@/lib/firebase/init"
import React, { useState, useEffect, useCallback } from "react"
import { limit, getDocs, query, where, collection, getCountFromServer, Query, orderBy, startAfter, DocumentSnapshot, getDoc } from "firebase/firestore"
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

        let newqdisp:Query;
        let skipflag = false;
        let indx = 0;
        // handle the case where the user select 2 index after which we have to render the indexes before
        if(pageCursors[selectedsetoften-1] === undefined && selectedsetoften > 0){
            skipflag = true;
            indx = selectedsetoften-1
            while(pageCursors[indx] === undefined && indx>0){
                indx--;
            }

            if(indx != 0){
                newqdisp = query(newq, startAfter(pageCursors[indx]) ,limit((selectedsetoften-indx)*10));
            }  else {
                newqdisp = query(newq, limit((selectedsetoften-indx)*10));
            }     // undefined starts at indx+1
        } else if(selectedsetoften === 0 || pageCursors.length === 0){
            newqdisp = query(newq, limit(10)) 
        } else {
            newqdisp = query(newq,
                    startAfter(pageCursors[selectedsetoften-1]),
                    limit(10)
                )
        }
      
        try {
            console.log("User's id is: "+auth.currentUser?.uid);
            
            const snapshotdata= await getDocs(newqdisp);
            const newCatItems: CatsProps[] = snapshotdata.docs.map((items) => ({ id: items.id, ...items.data() }) as CatsProps);
            if(skipflag){
                // for every ten data set pageCursor to the docs.data
                while(!(++indx >= selectedsetoften) ){
                    
                }
            } else {
                if (newCatItems.length > 0) {
                    setCats_item(newCatItems);
    
                    if(pageCursors[selectedsetoften] === undefined){
                        setPageCursors((prevcursor)=>[...prevcursor, snapshotdata.docs[snapshotdata.docs.length-1]])
                    }

                    console.log("Page Cursors: ", pageCursors[0]?pageCursors[0].data():undefined, " + ", pageCursors[1] ? pageCursors[1].data(): undefined);
                }
            }
            console.log("Cats object:", newCatItems);
            console.log("Cats retreived:",newCatItems.length);

            // total count/10 for indexing pages
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
        setItemtot,
        setSelectedattr,
        setselectedsetoften
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
        console.log("selectedsetoften:", selectedsetoften);
        console.log("pageCursors:", pageCursors);
        updates()
            .catch((e)=>console.log("Error fetching item: ", e))
            .finally(()=>{
                setIsLoading(false);
            });

    }, [selectedsetoften]); // Add getDocLen to the dependency array


    // useEffect(()=>{
    //     console.log("Search:", searchstr);
    // }, [searchstr]);

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
            <ul className={`flex justify-center gap-6 mt-16 ${cats_item.length <= 5 ? "mb-16" : ""}`}>
                {cats_item.slice(0, 5).map((item) => (
                    <li key={item.id}>
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
                    <React.Fragment>
                        <br />
                        <ul className="flex justify-center gap-6 mb-16">
                            {cats_item.slice(5).map((item) => (
                                <li key={item.id}>
                                <CatsCard 
                                    img={item.picture}
                                    desc={item.breed}
                                    price={item.price}
                                    title={item.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    </React.Fragment>
                )}
            
            <div>
                <div className="flex items-center justify-center space-x-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-2xl py-2 px-4 mr-2 rounded-full"
                        onClick={()=>setselectedsetoften(selectedsetoften-1 >= 0 ? selectedsetoften-1 : selectedsetoften)}
                    >
                        <LuArrowLeftFromLine />
                    </button>

                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften-1 > 0 ? "bg-orange-300" : "pointer-events-none" }`} 
                        onClick={()=>{setselectedsetoften(selectedsetoften-1 > 0 ? selectedsetoften-2 : 0)}}>
                            { selectedsetoften-1 > 0 ? selectedsetoften-1 : <></> }
                    </button>
                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften > 0 ? "bg-orange-300" : "pointer-events-none" }`} 
                        onClick={()=>{setselectedsetoften(selectedsetoften > 0 ? selectedsetoften-1 : 0)}}>
                            { selectedsetoften > 0 ? selectedsetoften : <></> }
                    </button>

                    
                    <button className="w-12 h-12 bg-orange-500 text-white rounded-full">{ selectedsetoften+1 }</button>
                    
                    
                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften+1 < itemtot ? "bg-orange-300" : "pointer-events-none" }`}
                        onClick={()=>setselectedsetoften(selectedsetoften+1 < itemtot ? selectedsetoften+1 : selectedsetoften)}>
                            { selectedsetoften+1 < itemtot ? selectedsetoften+2 : <></> }
                    </button>

                    <button className={`w-12 h-12 rounded-full ${ selectedsetoften+2 < itemtot ? "bg-orange-300" : "pointer-events-none" }`}
                        onClick={()=>setselectedsetoften(selectedsetoften+2 < itemtot ? selectedsetoften+2 : selectedsetoften)}>
                            { selectedsetoften+2 < itemtot ? selectedsetoften+3 : <></> }
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