"use client"
import React, { ReactNode, useEffect, useState } from "react"
import CatLoad from "@/components/admin/Cats/CatLoad";
import CatCreate from "@/components/admin/Cats/CatCreate";
import CatUpdate from "@/components/admin/Cats/CatUpdate"
import BreedLoad from "@/components/admin/Breeds/BreedLoad";
import BreedCreate from "@/components/admin/Breeds/BreedCreate";
import BreedUpdate from "@/components/admin/Breeds/BreedUpdate";
import UserUpdate from "@/components/admin/Users/UserUpdate";
import UserLoad from "@/components/admin/Users/UserLoad";

const AdminOnly: React.FC = ()=>{
    // const opened
    const [selection, setselection] = useState(0);
    const [idPlaceHolder, setidPlaceHolder] = useState<string|null>(null);
    const [components, setComponents] = useState<ReactNode>(<CatLoad setselection={setselection} setidPlaceHolder={setidPlaceHolder} />)


    const pages = ()=>{
        if (selection === 0) return <CatLoad setselection={setselection} setidPlaceHolder={setidPlaceHolder} />
        else if (selection === 1) return <CatCreate setselection={setselection} />
        else if (selection === 2) return <CatUpdate setselection={setselection} idPlaceHolder={idPlaceHolder} setidPlaceHolder={setidPlaceHolder} />
        else if (selection === 3) return <BreedLoad setselection={setselection} setidPlaceHolder={setidPlaceHolder} />
        else if (selection === 4) return <BreedCreate setselection={setselection} />
        else if (selection === 5) return <BreedUpdate setselection={setselection} idPlaceHolder={idPlaceHolder} setidPlaceHolder={setidPlaceHolder} />
        else if (selection === 6) return <UserLoad setselection={setselection} setidPlaceHolder={setidPlaceHolder} />
        else if (selection === 7) return <UserUpdate setselection={setselection} idPlaceHolder={idPlaceHolder} setidPlaceHolder={setidPlaceHolder} />
    }
    
    useEffect(()=>{
        setComponents(pages());
    }, [selection]);

    return (
        <>
            <div className="flex flex-col gap-5 items-center justify-center h-72 bg-gray-100 pt-14 dark:bg-gray-900">
                <div className="bg-white shadow-lg rounded-lg p-8 dark:bg-gray-700 ">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-white">CRUD Page</h1>
                </div>
                <div className="flex gap-4">
                    <button id="catsel" onClick={()=>setselection(0)} className={`px-6 py-2 min-w-[120px] text-center ${selection >= 0 && selection <= 2 ? "text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600" : "text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500" } focus:outline-none focus:ring`}>
                        Cats
                    </button>

                    <button id="breedsel" onClick={()=>setselection(3)} className={`px-6 py-2 min-w-[120px] text-center ${selection >=3 && selection <= 5 ? "text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600" : "text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500" } focus:outline-none focus:ring`}>
                        Breed
                    </button>

                    <button id="usersel" onClick={()=>setselection(6)} className={`px-6 py-2 min-w-[120px] text-center ${selection >= 6 && selection <=7 ? "text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600" : "text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500" } focus:outline-none focus:ring`}>
                        Users
                    </button>
                </div>
            </div>
            <div >
                {components}
            </div>
        </>
    )
}

export default AdminOnly;