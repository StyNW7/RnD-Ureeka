"use client"

import { query, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, generateAutoId } from "@/components/admin/BackEnd/utils";
import CatFormModel from "@/components/admin/Cats/CatFormModel"


interface CreateProp{
    setselection: (e:number)=>void
}



const CatCreate: React.FC<CreateProp> = ({setselection})=>{

    const collectionref = collection(db, "breed");
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
            const breedq = await getDocs(query(collectionref));

            const docs:BreedAttributes[] = breedq.docs.map((doc) => ({id:doc.id, ...doc.data()}) as BreedAttributes);
            setBreedOptions(docs.map((doc: BreedAttributes) => doc.breedname));
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
        if (image) {
        //   const imagetype = image.name.split('.').pop();
            const storageRef = ref(storage, `Cats/${image.name}`);
        
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

        if(name.length < 3){throw new Error("Name has to be more than 3 characters")}
        if(Number(price) <= 500 ){ throw new Error("Price must be at least 500") }
        if(Number(multiplier) < 1){ throw new Error("Multiplier cannot be below 1") }
        if(breed.length < 1){ throw new Error("Breed not specified") }
    }


      const handleCatCreate = async (e: React.FormEvent)=>{
        e.preventDefault();
        // not implemented yet
        try{
            validateParameters();
            const docref = doc(collection(db,"cats"));
            const imglink = await handleUpload(docref.id);

            await setDoc(docref,{
                breed: breed.length < 1 ? "Unidentified" : breed,
                multiplier: Number(multiplier),
                name: name,
                picture: imglink,
                price: Number(price),
            });



        } catch (err: any) {
            setErrors(err.message || 'Oops, something is wrong, cat`s not created');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
        


      }


    return(
        <div className="h-fit overflow-hidden flex items-center justify-center">
            <section className="w-full p-6 mx-auto bg-gradient-to-b to-orange-400 from-orange-500 shadow-md dark:bg-gray-800 ">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Create Cat</h1>
                <form onSubmit={handleCatCreate} className="mt-3">
                    <CatFormModel
                        id=""
                        breed=""
                        multiplier=""
                        price=""
                        name=""
                        picture={picture}
                        errors={errors}
                        setname={setname}
                        setbreed={setbreed}
                        setmultiplier={setmultiplier}
                        setprice={setprice}
                        breedOptions={breedOptions}
                        image={image}
                        handleImageChange={handleImageChange}
                    />
                    
                </form>
            </section>
        </div>
        
    )


}

export default CatCreate;

