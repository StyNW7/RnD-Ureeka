import Image from "next/image"
import { CatsAttributes, formatToIndonesianCurrency } from "@/components/admin/BackEnd/utils"
import React from "react"
import { arrayUnion, doc, Query, updateDoc, increment, deleteDoc, query, collection, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/init"
import { getAuth } from "firebase/auth"
import { useState } from "react"
import { LuLoader2 } from "react-icons/lu"
import { useUser } from "@/context/AuthContext"


interface ModalProp{
    cat: CatsAttributes
    setcat: React.Dispatch<React.SetStateAction<CatsAttributes|null>>
    setCats: React.Dispatch<React.SetStateAction<CatsAttributes[]>>
    setNotif: React.Dispatch<React.SetStateAction<string|null>>
    setNotifMessage: React.Dispatch<React.SetStateAction<string>>
    setNotifStatus: React.Dispatch<React.SetStateAction<"warn"|"success">>
    setAnimateInOut: React.Dispatch<React.SetStateAction<"in"|"out">>
}

const BuyingModal:React.FC<ModalProp> = ({cat, setcat, setCats, setNotif, setNotifStatus, setNotifMessage, setAnimateInOut})=>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { money, setMoney, setMultiplier } = useUser();
    
    const notify = (notif:string, notifMessage:string, status:"warn"|"success")=>{
        setAnimateInOut("in");
        setNotifMessage(notifMessage);
        setNotifStatus(status);
        setNotif(notif);
        setTimeout(()=>{
            setAnimateInOut("out");
            setNotif(notif);
            setTimeout(()=>{
                setNotif(null);
            }, 700);
        }, 3000);
    }

    const handleuserupdate = async (catss:CatsAttributes, money:number)=>{
        // arguments and values validation 
        if(!catss){
            notify("Failed !","Ooh no! Error occured while buying cat.", "warn");
            throw new Error("Cat object is null or undefined, Cannot");
        }
        if(money < catss.price){
            notify("Failed !","Not enough money to buy", "warn");
            throw new Error("Not enough money to buy");
        }
        if(catss.multiplier < 0){
            notify("Failed", "Ooh no! Error occured while buying cat.", "warn");
            throw new Error("Multiplier can't be a negative value");
        }

        try{
            const docref = doc(db, "users", getAuth().currentUser?.uid as string);
            await updateDoc(docref, {
                // adds the cat object to the user's cat array
                cats: arrayUnion(catss),
                // increments the user's multiplier based on the cat
                multiplier: increment(catss.multiplier),
                // decrease user's money
                money: increment(-catss.price)
            });
        } catch(e){
            notify("Failed !", "Ooh no! Error occured while buying cat.", "warn");
            throw new Error("User's instance error on update\n"+ e);
        }

        setMultiplier(prev => prev + catss.multiplier);
        setMoney(prev => prev - catss.price);

        // remove the cat from the main cats db
        try{
            const catdocref = doc(db, "cats", catss.id as string);
            await deleteDoc(catdocref);
        } catch(e){
            notify("Failed !","Successfully bought a cat !", "success");
            throw new Error("Cat is not deleted, id: " + catss.id + "\n" + e);
        }

        // refresh the allcat component using updates
        setCats(prev=>prev.filter((e)=> !(e.id === catss.id)));

        notify("Failed !","Successfully bought a cat !", "success");
    }

    const buying= ()=>{
        setIsLoading(true);
        handleuserupdate(cat, money)
            .catch(e=>console.log("Error because of this: "+e))
            .finally(()=>{
                setIsLoading(false)
            });
        setcat(null);
    }

    return (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg w-11/12 h-[95%] md:h-min max-w-3xl">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <Image 
                            height={1000}
                            width={1000}
                            src={cat.picture}
                            alt={`Photo of ${cat.name}`} 
                            className="w-2/3 sm:w-1/2 md:w-full md:h-2/3 object-cover rounded-lg"
                        />
                    </div>

                    {/* Informasi Kucing */}
                    <div className="w-full md:w-1/2 space-y-4">
                        <h2 className="text-2xl font-bold dark:text-white">{ cat.name }</h2>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Breed:</span>
                                <span className="font-medium dark:text-white">{ cat.breed }</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Jenis Kelamin:</span>
                                <span className="font-medium dark:text-white">Betina</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Berat:</span>
                                <span className="font-medium dark:text-white">3.5 kg</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Multiplier:</span>
                                <span className="font-medium dark:text-white">{ cat.multiplier }</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Status Vaksin:</span>
                                <span className="font-medium text-green-500">Lengkap</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2 dark:text-white">Deskripsi</h3>
                            <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-100 dark:scrollbar-track-slate-700 pr-2">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Kucing yang sehat dan aktif. Sudah terlatih menggunakan kotoran dan sangat ramah dengan anak-anak. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-2xl font-bold text-orange-500 mb-4">
                                { formatToIndonesianCurrency(cat.price) }
                            </div>
                            <div className="flex gap-4 justify-center">
                                {isLoading ?
                                        <div className="flex items-center h-full  ">
                                            <LuLoader2 className="animate-spin text-lg text-orange-500 mr-1  " />
                                            <div className="flex justify-center items-center  ">
                                                <p className="text-lg font-bold text-orange-500 animate-pulse">
                                                    Loading...
                                                </p>
                                            </div>
                                        </div>
                                    :
                                        <>
                                            <button 
                                                className="w-1/2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                                onClick={buying}
                                            >
                                                Buy Now
                                            </button>
                                            <button 
                                                className="w-1/2 border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
                                                onClick={()=>setcat(null)}    
                                            >
                                                Cancel
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tombol Tutup */}
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

    )
} 


export default BuyingModal