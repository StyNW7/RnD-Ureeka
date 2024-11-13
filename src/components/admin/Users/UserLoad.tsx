"use client"
import { db, auth } from "@/lib/firebase/init"
import React, { useState, useEffect, useCallback } from "react"
import { limit, getDocs, query, collection, getCountFromServer, Query, startAfter, DocumentSnapshot } from "firebase/firestore"
import {LuArrowLeftFromLine, LuArrowRightFromLine, LuLoader2} from "react-icons/lu"
import { querySortBuilder, UserAttributes, UserAttributesType } from "@/components/admin/BackEnd/utils"
import UserCard from "@/components/ui/UserCard";
import { getAuth } from "firebase/auth"

interface StateProps{
    setselection: (e:number)=>void
    setidPlaceHolder:(e:string|null)=>void
}

const UserLoad: React.FC<StateProps> = ({setselection, setidPlaceHolder})=>{

    const collectionref = collection(db, "users");

    const [selectedsetoften, setselectedsetoften] = useState<number>(0);
    const [itemtot, setItemtot] = useState<number>(1);
    const [user_item, setuser_item] = useState<UserAttributes[]>([]); // need to query and stored in here
    const [searchstr, setSearchstr] = useState<string>(""); // for every change update the user_item and itemtot
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cursors, setCursors] = useState<(DocumentSnapshot | null)[]>([null]);
    const [selectedattr, setSelectedattr] = useState<keyof typeof UserAttributesType>("name");
    const [nothingFound, setnothingFound] = useState<boolean>(false);

    const updates = useCallback(async () => {
        
        if (isLoading){
            return;
        }      

        const newq:Query = querySortBuilder(collectionref, UserAttributesType, selectedattr, searchstr);


        let newqdisp:Query;
        
        if (selectedsetoften === 0 || !cursors[selectedsetoften]) {
            newqdisp = query(newq, limit(6));
        } else {
            newqdisp = query(newq, startAfter(cursors[selectedsetoften]), limit(6));
        }
        
        console.log("Getauth :", getAuth().currentUser?.uid);

        try {
            
            const snapshotdata = await getDocs(newqdisp);
            console.log(snapshotdata);
            const newUserItems: UserAttributes[] = snapshotdata.docs.map((items) => ({ id: items.id, ...items.data() }) as UserAttributes);
            
            if (newUserItems.length > 0) {
                setuser_item(newUserItems);
                const lastDoc = snapshotdata.docs[snapshotdata.docs.length - 1];
                setCursors(prev => {
                    const newCursors = [...prev];
                    newCursors[selectedsetoften + 1] = lastDoc;
                    return newCursors;
                });
            } else {
                console.error("user not retrieved, Connection problem ?");
            }

            console.log("user retreived:", newUserItems.length);

            // total count/6 for indexing pages
            const snapshot = await getCountFromServer(newq);
            const count = snapshot.data().count;
            if (count == 0) { 
                setnothingFound(true);
                setTimeout(() => {
                    setnothingFound(false);
                }, 5000);
            }
            setItemtot(Math.ceil(count / 6));      
        } catch (error) {
            console.error("Error counting documents: " + error);
        }
      }, [
        isLoading,
        collectionref,
        searchstr,
        selectedsetoften,
        cursors,
        auth,
        selectedattr,
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
                    onChange={(e) => setSelectedattr(e.target.value as keyof typeof UserAttributesType)}
                    className="px-4 py-2 mr-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold dark:bg-gray-800"
                >
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="multiplieru">Multiplier Up</option>
                    <option value="multiplierd">Multiplier Down</option>
                    <option value="moneyu">Money Up</option>
                    <option value="moneyd">Money Down</option>
                    <option value="isAdminu">Admin True</option>
                    <option value="isAdmind">Admin False</option>
                    <option value="experienceu">Experience Up</option>
                    <option value="experienced">Experience Down</option>
                    <option value="createdAtu">Acc Made Up</option>
                    <option value="createdAtd">Acc Made Down</option>
                </select>
                <input
                    type={selectedattr==="createdAtu" || selectedattr==="createdAtd"? "date" :"text"}
                    placeholder={"Search User..."}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold dark:bg-gray-800 "
                    value={searchstr}
                    onChange={(e) => {
                        setSearchstr(e.target.value);
                        if(selectedattr==="createdAtu" || selectedattr==="createdAtd"){trigsearch();}
                    }}
                    onKeyDown={(e) => {if (e.key === 'Enter'){trigsearch()}}}
                    
                />

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
                    <ul className={`flex justify-center gap-6 mt-16 ${user_item.length <= 5 ? "mb-16" : ""}`}>
                        {user_item.slice(0, 3).map((item) => (
                            <li key={item.id} onClick={()=>{setidPlaceHolder(item.id);setselection(7)}}>
                                <UserCard 
                                    id={item.id}
                                    createdAt={item.createdAt}
                                    experience={item.experience}
                                    isAdmin={item.isAdmin}
                                    money={item.money}
                                    multiplier={item.multiplier}
                                    profpic={item.profpic}
                                    name={item.name}
                                    cats={item.cats}
                                />
                            </li>
                        ))}
                    </ul>
                    {user_item.length > 5 && (
                        <>
                            <br />
                            <ul className="flex justify-center gap-6 mb-16">
                                {user_item.slice(3).map((item) => (
                                    <li key={item.id} onClick={()=>{setidPlaceHolder(item.id);setselection(7)}}>
                                        <UserCard 
                                            id={item.id}
                                            createdAt={item.createdAt}
                                            experience={item.experience}
                                            isAdmin={item.isAdmin}
                                            money={item.money}
                                            multiplier={item.multiplier}
                                            profpic={item.profpic}
                                            cats={item.cats}
                                            name={item.name}
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


export default UserLoad;
