"use client"

import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, isBreedAttributes, CatsAttributes, UserAttributes } from "@/components/admin/BackEnd/utils";
import BreedFormModel from "@/components/admin/Breeds/BreedFormModel";
import { getAuth } from "firebase/auth";


interface CreateProp{
    setselection: (e:number)=>void
    objectPlaceHolder:CatsAttributes|UserAttributes|BreedAttributes|null
    setObjectPlaceHolder:React.Dispatch<React.SetStateAction<CatsAttributes|UserAttributes|BreedAttributes|null>>
}



const BreedUpdate: React.FC<CreateProp> = ({setselection, objectPlaceHolder, setObjectPlaceHolder})=>{
    const CollectionName = "breed";
    
    const [name, setname] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [origin, setOrigin] = useState<string>("");
    const [errors, setErrors] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<BreedAttributes|null>(null);

    useEffect(() => {
        if(!isBreedAttributes(objectPlaceHolder)){
            setselection(3);
            setObjectPlaceHolder(null);
            return 
        };
        setInitialData(objectPlaceHolder);
        setname(objectPlaceHolder.name);
        setDescription(objectPlaceHolder.description);
        setOrigin(objectPlaceHolder.origin);
        setObjectPlaceHolder(null);        
    }, []);

    const validateParameters = ()=>{
        if(!name || !description || !origin){
            throw new Error("Please fill all required fields");
        }

        if(name.length < 3){throw new Error("Name has to be more than 3 characters")}
        if(description.split(" ").length < 3){throw new Error("Description has to be more than 3 words")}
        if(origin.length < 2){throw new Error("Origin has to be more than 3 characters")}
    }


    const handleBreedUpdate = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            validateParameters();
            const docref = doc(db, CollectionName, (initialData?.id as string));

            await updateDoc(docref,{
                name: name,
                origin: origin,
                description: name,
            });

            setselection(3);

        } catch (err: any) {
            setErrors(err.message + getAuth().currentUser?.uid || 'Oops, something is wrong, Breed`s not updated');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
    }

    const handleDelete = async()=>{
        const docref = doc(db, CollectionName, (initialData?.id as string));
        try{
            await deleteDoc(docref);
            console.log("Delete Breed document successfully");
            setselection(3);
        } catch(error: any){
            setErrors(error.message || 'Oops, delete unsuccessful');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
    }


    return(
        <div className="h-fit overflow-hidden flex items-center justify-center">
            <section className="w-full h-[69.8vh] p-6 mx-auto bg-gradient-to-b to-orange-400 from-orange-500 shadow-md dark:from-gray-700 dark:to-gray-800 ">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Edit Breed</h1>
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
                        handleDelete={handleDelete}
                    />
                    
                </form>
            </section>
        </div>
        
    )


}

export default BreedUpdate;

