"use client"

import { query, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, CatsAttributes, hanldeImageDelete, UserAttributes, isCatsAttributes } from "@/components/admin/BackEnd/utils";
import CatFormModel from "@/components/admin/Cats/CatFormModel"


interface CreateProp{
    setselection: (e:number)=>void
    objectPlaceHolder:CatsAttributes|UserAttributes|BreedAttributes|null
    setObjectPlaceHolder:React.Dispatch<React.SetStateAction<CatsAttributes|UserAttributes|BreedAttributes|null>>
}



const CatUpdate: React.FC<CreateProp> = ({setselection, objectPlaceHolder, setObjectPlaceHolder})=>{

    const CollectionName = "cats";
    const StorageFolder = "Cats";


    const collectionbreedref = collection(db, "breed");
    const [breed, setbreed] = useState<string>("");
    const [name, setname] = useState<string>("");
    const [multiplier, setmultiplier] = useState<string>(""); // for logic convert to number
    const [price, setprice] = useState<string>(""); // for efficiency no set number because need parsing in html if that's the case
    const [picture, setpicture] = useState<string|null>(null);
    const [image, setimage] = useState<File|null>(null);
    const [errors, setErrors] = useState<string | null>(null);
    const [breedOptions, setBreedOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const breedq = await getDocs(query(collectionbreedref));
            const docs:BreedAttributes[] = breedq.docs.map((doc) => ({id:doc.id, ...doc.data()}) as BreedAttributes);
            setBreedOptions(docs.map((doc: BreedAttributes) => doc.name));
            
            if(isCatsAttributes(objectPlaceHolder)){
                setbreed(objectPlaceHolder.breed);
                setname(objectPlaceHolder.name);
                setmultiplier(objectPlaceHolder.multiplier.toString());
                setprice(objectPlaceHolder.price.toString());
                setpicture(objectPlaceHolder.picture);
                setObjectPlaceHolder(null);
                return;
            }
            
            setObjectPlaceHolder(null);
            setselection(0);
            return;
        };
        fetchData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setimage(selectedFile);
    
            // Create a preview URL using FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                setpicture(reader.result as string); // Set the preview URL in state
            };
            reader.readAsDataURL(selectedFile); // Read the image file as a data URL
        }
    }


    const handleUpload = async (uid: string): Promise<null|string> => {
        if (image && picture && picture != (objectPlaceHolder as CatsAttributes)?.picture) {
            await hanldeImageDelete(uid, StorageFolder);
            const imagetype = image.name.split('.').pop();
            const storageRef = ref(storage, `${StorageFolder}/${uid + "." + imagetype}`);
        
            const metadata: UploadMetadata = {
                contentType: image.type,
            }
        
            try {
                await uploadBytes(storageRef, image, metadata);
                console.log('Image upload successful!');
        
                const downloadUrl = await getDownloadURL(storageRef)
        
                setpicture(downloadUrl);
                setimage(null);
        
                return downloadUrl;
            } catch (error) {
                console.error('Upload failed:', error);
                return null;
        }
        } else {
            console.error('Upload failed: '+ "no image");
            return null;
        }
      };

    const validateParameters = ()=>{
        if(!name || !breed || !price || !multiplier || !picture){
            throw new Error("Please fill all required fields");
        }
        if(!(objectPlaceHolder as CatsAttributes)?.id){ throw new Error("Data ID is not defined or maybe lost in the process!")}
        if(name.length < 3){throw new Error("Name has to be more than 3 characters")}
        if(Number(price) <= 500 ){ throw new Error("Price must be at least 500") }
        if(Number(multiplier) < 1){ throw new Error("Multiplier cannot be below 1") }
        if(breed.length < 1){ throw new Error("Breed not specified") }
    }


    const handleCatUpdate = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            validateParameters();
            const docref = doc(db, CollectionName, ((objectPlaceHolder as CatsAttributes)?.id as string));
            const imglink = await handleUpload(docref.id);

            await updateDoc(docref,{
                breed: breed,
                multiplier: Number(multiplier),
                name: name,
                picture: imglink ? imglink : (objectPlaceHolder as CatsAttributes)?.picture,
                price: Number(price),
            });

            setselection(0);
        } catch (err: any) {
            setErrors(err.message || 'Oops, something is wrong, cat`s not updated');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
    }

    const handleDelete = async()=>{

        const docref = doc(db, CollectionName, ((objectPlaceHolder as CatsAttributes)?.id as string));
        await hanldeImageDelete(docref.id, StorageFolder);

        try{
            await deleteDoc(docref);
            console.log("Delete Cat document successfully");
            setTimeout(() => {
                setselection(0);
            }, 100);
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
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Edit Cat</h1>
                <form onSubmit={handleCatUpdate} className="mt-3">
                    <CatFormModel
                        id={objectPlaceHolder?.id as string}
                        breed={breed}
                        multiplier={multiplier}
                        price={price}
                        name={name}
                        picture={picture}
                        errors={errors}
                        setname={setname}
                        setbreed={setbreed}
                        setmultiplier={setmultiplier}
                        setprice={setprice}
                        breedOptions={breedOptions}
                        handleImageChange={handleImageChange}
                        handleDelete={handleDelete}
                    />
                    
                </form>
            </section>
        </div>
        
    )


}

export default CatUpdate;

