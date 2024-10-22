"use client"

import { query, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, generateAutoId } from "./BackEnd/utils";
import Image from "next/image";


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
          const imagetype = image.name.split('.').pop();
          const storageRef = ref(storage, `Cats/${uid}.${imagetype}`);
    
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
                    
                    {errors && <div className="text-red-600 px-2 bg-white rounded-full">{errors}</div>}

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                            <input id="name" onChange={(e)=>setname(e.target.value)} type="text" placeholder="Type your name here ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="breed">Breed</label>
                            <select id="breed" onChange={(e)=>setbreed(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option value="">Choose Breed</option>
                                {
                                    breedOptions.map((breedname)=>{
                                        return <option key={breedname} value={breedname}>{breedname}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="price">Price</label>
                            <input id="price" onChange={(e)=>setprice(e.target.value)} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="multiplier">Multiplier</label>
                            <input id="multiplier" step="any" onChange={(e)=>setmultiplier(e.target.value)} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <label htmlFor="file-upload" className="w-72 h-72">
                            <div className="block text-sm font-medium text-white">
                                Image
                            </div>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 w-80 h-80 border-gray-300 border-dashed rounded-md">
                                {
                                   image === null ? 
                                        (<div className="space-y-1 text-center my-auto">
                                            <svg className="mx-auto h-32 w-32 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div className="flex justify-center text-sm text-gray-600">
                                                <label htmlFor="file-upload" className=" relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span className="text-lg">Upload an image</span>
                                                </label>
                                            </div>
                                            <p className="text-lg text-white">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>)
                                    :
                                        (
                                            <Image
                                                src={picture ===null ? "" : picture}
                                                height={1000}
                                                width={1000}
                                                className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl z-0"
                                                alt="Profile Picture"
                                                loading="lazy"
                                            />
                                        )

                                }
                            </div>
                            <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </label>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>
        </div>
        
    )


}

export default CatCreate;

