"use client"

import { query, collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, UserAttributes } from "@/components/admin/BackEnd/utils";
import UserFormModel from "@/components/admin/Users/UserFormModel";


interface CreateProp{
    setselection: (e:number)=>void
    idPlaceHolder: string|null,
    setidPlaceHolder: (e:string|null)=>void
}



const UserUpdate: React.FC<CreateProp> = ({setselection, idPlaceHolder, setidPlaceHolder})=>{

    const collectionbreedref = collection(db, "users");
    const [name, setName] = useState<string>("");
    const [experience, setExperience] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [money, setMoney] = useState<string>("");
    const [multiplier, setmultiplier] = useState<string>(""); 
    const [profpic, setprofpic] = useState<string|null>(null);
    const [image, setimage] = useState<File|null>(null);
    const [errors, setErrors] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<UserAttributes|null>(null);
    const fileExt = ['.jpeg', '.png', '.jpg', '.webp', '.svg']

    useEffect(() => {
        const fetchData = async () => {
            if(!idPlaceHolder){return}
            const datadoc = doc(db, 'users', idPlaceHolder);
            const pulleddata = await getDoc(datadoc);
            if(pulleddata.exists()){
                const daata = {
                    ...pulleddata.data(),
                    id:idPlaceHolder
                } as UserAttributes;
                setInitialData(daata);
                setName(daata.name);
                setExperience(daata.experience.toString());
                setIsAdmin(daata.isAdmin);
                setMoney(daata.money.toString());
                setprofpic(daata.profpic);
                setmultiplier(daata.multiplier.toString());
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
                setprofpic(reader.result as string); // Set the preview URL in state
            };
            reader.readAsDataURL(selectedFile); // Read the image file as a data URL
        }
    }

    const handleUpload = async (uid: string): Promise<null|string> => {
        if (image && profpic && profpic != initialData?.profpic) {
            let yesfound = false;
            await Promise.all(
                fileExt.map(async (ext) => {
                    console.log("deleting file with name", uid, ext);
                    if(!yesfound){
                        const fileRef = ref(storage, `UserProf/${uid}` + ext);
                        console.log
                        try {
                            await deleteObject(fileRef);
                            yesfound = true;
                            console.log(`File deleted successfully: ${`UserProf/${uid}` + ext}`);
                        } catch (error) {
                            if(ext === fileExt[fileExt.length-1]){
                                console.log(`File not found: ${`UserProf/${uid}` + ext}`);
                                console.log(`Error firebase storage file not found ${error}`);
                                // nofoun = true;
                                console.log('Continuing the upload even if the img is not deleted');
                            }
                            return null;
                        }
                    }
                })
            );
            
            const storageRef = ref(storage, `UserProf/${image.name}`);
        
            const metadata: UploadMetadata = {
                contentType: image.type,
            }
        
            try {
                await uploadBytes(storageRef, image, metadata);
                console.log('Image upload successful!');
        
                const downloadUrl = await getDownloadURL(storageRef)
        
                setprofpic(downloadUrl);
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
        if(!name || experience.length<=0 || money.length <=0 || multiplier.length <=0 || !profpic ){
            throw new Error("Please fill all required fields");
        }

        if(name.length < 3){
            throw new Error("Username needs at least 3 character");
        } else if(!(/^[a-zA-Z0-9_]+$/.test(name))){
            throw new Error("Username has to be Alphanumerical or '_'");
        }
        if(isNaN(Number(experience))){throw new Error("Experience has to be a number type")}
        if(isNaN(Number(money))){ throw new Error("Money has to be a number type") }
        if(isNaN(Number(multiplier))){ throw new Error("Multiplier has to be a number type") }
        if(Number(multiplier) < 1){ throw new Error("Multiplier cannot be below 1") }
    }


      const handleUserUpdate = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            validateParameters();
            
            const docref = doc(db, 'users', (initialData?.id as string));
            const imglink = await handleUpload(docref.id);

            await updateDoc(docref,{
                name:name,
                experience: Number(experience),
                isAdmin:isAdmin,
                money: Number(money),
                multiplier: Number(multiplier),
                profpic:imglink ? imglink : initialData?.profpic,
            });

            setselection(6);

        } catch (err: any) {
            setErrors(err.message || 'Oops, something is wrong, cat`s not updated');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
        
      }

      const updateIsAdmin = (e:string)=>{
        setIsAdmin(e.toLowerCase() === 'true');
      }

    return(
        <div className="h-fit overflow-hidden flex items-center justify-center">
            <section className="w-full h-[69.8vh] p-6 mx-auto bg-gradient-to-b to-orange-400 from-orange-500 shadow-md dark:from-gray-700 dark:to-gray-800 ">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Create Cat</h1>
                <form onSubmit={handleUserUpdate} className="mt-3">
                    <UserFormModel
                        id={idPlaceHolder as string}
                        name={name}
                        setname={setName}

                        multiplier={multiplier}
                        setmultiplier={setmultiplier}

                        money={money}
                        setmoney = {setMoney}

                        experience={experience}
                        setexperience={setExperience}

                        isAdmin={isAdmin}
                        setisAdmin={updateIsAdmin}

                        profpic={profpic}
                        
                        errors={errors}

                        handleImageChange={handleImageChange}

                    />
                    
                </form>
            </section>
        </div>
        
    )


}

export default UserUpdate;

