"use client"

import { query, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import BreedFormModel from "@/components/admin/Breeds/BreedFormModel"


interface CreateProp{
    setselection: (e:number)=>void
}



const BreedCreate: React.FC<CreateProp> = ({setselection})=>{

    const collectionref = collection(db, "breed");
    const [name, setname] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [origin, setOrigin] = useState<string>("");
    const [errors, setErrors] = useState<string | null>(null);


    const validateParameters = ()=>{
        if(!name || !description || !origin){
            throw new Error("Please fill all required fields");
        }

        if(name.length < 3){throw new Error("Name has to be more than 3 characters")}
        if(description.split(" ").length < 3){throw new Error("Description has to be more than 3 characters")}
        if(origin.length < 2){throw new Error("Origin has to be more than 3 characters")}
    }


      const handleBreedCreate = async (e: React.FormEvent)=>{
        e.preventDefault();
        // not implemented yet
        try{
            validateParameters();
            const docref = doc(collection(db,"breed"));

            await setDoc(docref,{
                name: name,
                origin: origin,
                description: name,
            });

            setselection(3);

        } catch (err: any) {
            setErrors(err.message || 'Oops, something is wrong, cat`s not created');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
        


      }


    return(
        <div className="h-fit overflow-hidden flex items-center justify-center">
            <section className="w-full h-[69.8vh] p-6 mx-auto bg-gradient-to-b to-orange-400 from-orange-500 shadow-md dark:from-gray-700 dark:to-gray-800 ">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Create Breed</h1>
                <form onSubmit={handleBreedCreate} className="mt-3">
                    <BreedFormModel
                        id=""
                        name={name}
                        setname={setname}
                        description={description}
                        setdescription={setDescription}
                        origin={origin}
                        setorigin={setOrigin}
                        errors={errors}
                    />
                    
                </form>
            </section>
        </div>
        
    )


}

export default BreedCreate;

