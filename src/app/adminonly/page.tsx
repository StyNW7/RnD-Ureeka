"use client"
import React, { useState } from "react"
import CatLoad from "@/components/admin/CatLoad";
import CatCreate from "@/components/admin/CatCreate";

const AdminOnly: React.FC = ()=>{
    // const opened
    const [selection, setselection] = useState(0);


    return (
        <>
            <div className="flex flex-col gap-5 items-center justify-center h-64 bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-5xl font-bold text-gray-800">CRUD Page</h1>
                </div>
                <div className="flex gap-4">
                    <button id="catsel" onClick={()=>setselection(0)} className={`px-6 py-2 min-w-[120px] text-center ${selection == 0 || selection == 1 ? "text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600" : "text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500" } focus:outline-none focus:ring`}>
                        Cats
                    </button>

                    <button id="breedsel" onClick={()=>setselection(2)} className={`px-6 py-2 min-w-[120px] text-center ${selection == 2 || selection == 3 ? "text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600" : "text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500" } focus:outline-none focus:ring`}>
                        Breed
                    </button>

                    <button id="usersel" onClick={()=>setselection(4)} className={`px-6 py-2 min-w-[120px] text-center ${selection == 4 || selection ==5 ? "text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600" : "text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500" } focus:outline-none focus:ring`}>
                        Users
                    </button>
                </div>
            </div>
            <div>
                { selection <= 1 ? (selection==0 ? <CatLoad setselection={setselection} /> : <CatCreate setselection={setselection} /> ) : (selection<=3 ? (selection == 2 ? <></> : <></> ) : ( selection <=5 ? (selection == 4 ? <></> : <></>) : <h1>Fail to get section</h1> ))}
            </div>
        </>
    )
}

export default AdminOnly;