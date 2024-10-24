"use client"

import { query, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, CatsAttributes, hanldeImageDelete } from "@/components/admin/BackEnd/utils";
import CatFormModel from "@/components/admin/Cats/CatFormModel"


interface CreateProp{
    setselection: (e:number)=>void
    idPlaceHolder: string|null,
    setidPlaceHolder: (e:string|null)=>void
}



const CatUpdate: React.FC<CreateProp> = ({setselection, idPlaceHolder, setidPlaceHolder})=>{

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
    const [initialData, setInitialData] = useState<CatsAttributes|null>(null);
    

    useEffect(() => {
        const fetchData = async () => {
            const breedq = await getDocs(query(collectionbreedref));

            const docs:BreedAttributes[] = breedq.docs.map((doc) => ({id:doc.id, ...doc.data()}) as BreedAttributes);
            setBreedOptions(docs.map((doc: BreedAttributes) => doc.name));
            if(!idPlaceHolder){return}
            const datadoc = doc(db, CollectionName, idPlaceHolder);
            const pulleddata = await getDoc(datadoc);
            if(pulleddata.exists()){
                const daata = {
                    ...pulleddata.data(),
                    id:idPlaceHolder
                } as CatsAttributes;
                setInitialData(daata);
                setbreed(daata.breed);
                setname(daata.name);
                setmultiplier(daata.multiplier.toString());
                setprice(daata.price.toString());
                setpicture(daata.picture);
                setidPlaceHolder(null);
            } else {
                setidPlaceHolder(null);
                setselection(0);
            }
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
        if (image && picture && picture != initialData?.picture) {
            await hanldeImageDelete(uid, StorageFolder);
            
            const storageRef = ref(storage, `${StorageFolder}/${image.name}`);
        
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
        if(!initialData?.id){ throw new Error("Data ID is not defined or maybe lost in the process!")}
        if(name.length < 3){throw new Error("Name has to be more than 3 characters")}
        if(Number(price) <= 500 ){ throw new Error("Price must be at least 500") }
        if(Number(multiplier) < 1){ throw new Error("Multiplier cannot be below 1") }
        if(breed.length < 1){ throw new Error("Breed not specified") }
    }


    const handleCatUpdate = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            validateParameters();
            const docref = doc(db, CollectionName, (initialData?.id as string));
            const imglink = await handleUpload(docref.id);

            await updateDoc(docref,{
                breed: breed,
                multiplier: Number(multiplier),
                name: name,
                picture: imglink ? imglink : initialData?.picture,
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

        const docref = doc(db, CollectionName, (initialData?.id as string));
        await hanldeImageDelete(docref.id, StorageFolder);

        try{
            await deleteDoc(docref);
            console.log("Delete Cat document successfully");
            setselection(0);
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
                        id={idPlaceHolder as string}
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

