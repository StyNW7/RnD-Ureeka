"use client"

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes } from "@/components/admin/BackEnd/utils";
import BreedFormModel from "@/components/admin/Breeds/BreedFormModel";
import { getAuth } from "firebase/auth";


interface CreateProp{
    setselection: (e:number)=>void
    idPlaceHolder: string|null,
    setidPlaceHolder: (e:string|null)=>void
}



const BreedUpdate: React.FC<CreateProp> = ({setselection, idPlaceHolder, setidPlaceHolder})=>{
    const [name, setname] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [origin, setOrigin] = useState<string>("");
    const [errors, setErrors] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<BreedAttributes|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!idPlaceHolder){return}
            const datadoc = doc(db, 'breed', idPlaceHolder);
            const pulleddata = await getDoc(datadoc);
            if(pulleddata.exists()){
                const daata = {
                    ...pulleddata.data(),
                    id:idPlaceHolder
                } as BreedAttributes;
                setInitialData(daata);
                setname(daata.name);
                setDescription(daata.description);
                setOrigin(daata.origin);
            } else {
                setidPlaceHolder(null);
                setselection(0);
            }
        };
        fetchData();
    }, []);

    const validateParameters = ()=>{
        if(!name || !description || !origin){
            throw new Error("Please fill all required fields");
        }

        if(name.length < 3){throw new Error("Name has to be more than 3 characters")}
        if(description.split(" ").length < 3){throw new Error("Description has to be more than 3 characters")}
        if(origin.length < 2){throw new Error("Origin has to be more than 3 characters")}
    }


      const handleBreedUpdate = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            validateParameters();
            const docref = doc(db, 'breed', (initialData?.id as string));

            await updateDoc(docref,{
                name: name,
                origin: origin,
                description: name,
            });



        } catch (err: any) {
            setErrors(err.message + getAuth().currentUser?.uid || 'Oops, something is wrong, Breed`s not updated');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
        


      }


    return(
        <div className="h-fit overflow-hidden flex items-center justify-center">
            <section className="w-full h-[69.8vh] p-6 mx-auto bg-gradient-to-b to-orange-400 from-orange-500 shadow-md dark:bg-gray-800 ">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Create Cat</h1>
                <form onSubmit={handleBreedUpdate} className="mt-3">
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

export default BreedUpdate;

