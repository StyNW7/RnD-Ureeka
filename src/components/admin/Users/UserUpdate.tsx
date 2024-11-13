"use client"

import { query, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, writeBatch } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React, { useRef, useCallback } from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, CatsAttributes, UserAttributes, hanldeImageDelete } from "@/components/admin/BackEnd/utils";
import UserFormModel from "@/components/admin/Users/UserFormModel";


interface CreateProp{
    setselection: (e:number)=>void
    idPlaceHolder: string|null,
    setidPlaceHolder: (e:string|null)=>void
}



const UserUpdate: React.FC<CreateProp> = ({setselection, idPlaceHolder, setidPlaceHolder})=>{

    const CollectionName = "users";
    const StorageFolder = "UserProf";

    const collectionAdminref = collection(db, "adminList")
    const [name, setName] = useState<string>("");
    const [experience, setExperience] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [money, setMoney] = useState<string>("");
    const [multiplier, setmultiplier] = useState<string>(""); 
    const [profpic, setprofpic] = useState<string|null>(null);
    const [cats, setcats] = useState<CatsAttributes[]>([]);
    const [removedCats, setRemovedCats] = useState<CatsAttributes[]>([]);
    const [updatedCats, setUpdatedCats] = useState<CatsAttributes[]>([]);
    const [originalThatAreUpdated, setOriginalThatAreUpdated] = useState<CatsAttributes[]>([]); //gk perlu ini kan udah ada initial data cuyyyyy
    const [image, setimage] = useState<File|null>(null);
    const [errors, setErrors] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<UserAttributes|null>(null);
    const [breeds, setbreeds] = useState<string[]>([]);
    const catManipulationFlag = useRef(false);

    useEffect(() => {
        const fetchbreed = async () => {
            const breedq = await getDocs(query(collection(db,"breed")));

            const docs:BreedAttributes[] = breedq.docs.map((doc) => ({id:doc.id, ...doc.data()}) as BreedAttributes);
            setbreeds(docs.map((doc: BreedAttributes) => doc.name));
        };
        const fetchData = async () => {
            if(!idPlaceHolder){return}
            const datadoc = doc(db, CollectionName, idPlaceHolder);
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
                setcats(daata.cats);
                setidPlaceHolder(null);
            } else {
                setidPlaceHolder(null);
                setselection(6);
            }
        };
        fetchData();
        fetchbreed();
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
            if(!initialData?.id){
                throw new Error("Oops! Document ID is not available, Maybe it got lost on the process")
            }
            await hanldeImageDelete(initialData?.id, StorageFolder)
            
            const storageRef = ref(storage, `${StorageFolder}/${image.name}`);
        
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
            
            const docref = doc(db, CollectionName, (initialData?.id as string));
            const imglink = await handleUpload(docref.id);

            if(initialData?.isAdmin === false && isAdmin){
                const docadminref = doc(collectionAdminref);
                await setDoc(docadminref, {
                    adminID: initialData.id
                });
            } else if(initialData?.isAdmin === true && !isAdmin) {
                const docadminref = doc(collectionAdminref, initialData.id);
                try{
                    await deleteDoc(docadminref);
                    console.log("Admin removed successfully");
                } catch (error){
                    console.error("Admin removing not completed, "+ error);
                }
            }

            const batch = writeBatch(db);

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

    const handleDelete = async ()=>{
        const docref = doc(db, CollectionName, (initialData?.id as string));
        await hanldeImageDelete(docref.id, StorageFolder);

        try{
            await deleteDoc(docref);
            console.log("Deleted User document successfully");
            setselection(6);
        } catch(error: any){
            setErrors(error.message || 'Oops, delete unsuccessful');
            setTimeout(() => {
                setErrors(null);
            }, 7000);
        }
    }

    const updateCat = <K extends Exclude<keyof CatsAttributes, "id">>(id:CatsAttributes["id"], attr:K, value:CatsAttributes[K])=>{
        // insert into the updated cats array
        

        if(catManipulationFlag.current){
            return;
        }

        catManipulationFlag.current = true;

        setUpdatedCats(prev => {
            if(!originalThatAreUpdated.some(e=>e.id === id)){
                // the original cat
                const thecat:CatsAttributes|undefined = cats.find(e=>e.id === id);
                // insert the original cat
                if(thecat){
                    setOriginalThatAreUpdated(previ=>[...previ, thecat]);
                    // remove the cat from cats array 
                    setcats(previ=>previ.filter(e=>e.id !== id));
                    // cat attribute change
                    const updated = { ...thecat }
                    updated[attr] = value;
                    return [...prev, updated];
                }
            } else {
                setUpdatedCats(prev=>{
                    const thecat = updatedCats.find(e=>e.id===id);
                    if(thecat){
                        thecat[attr] = value;
                    }
                    return prev;
                })
            }
            return prev;
        });

        setTimeout(() => {
            catManipulationFlag.current = false;
        }, 0);
    }

    const undoUpdate = (id: string)=>{
        
        if(catManipulationFlag.current){
            return;
        }

        catManipulationFlag.current = true;

        setUpdatedCats(prev=>{
            const ori = originalThatAreUpdated.find(e=>e.id===id); 
            if(ori){
                setcats(prevCats=>{
                    if(prevCats.some(cat => cat.id === id)) {
                        return prevCats;
                    }
                    return [...prevCats, ori];
                });

                setOriginalThatAreUpdated(previ=>previ.filter(e=>e.id !== id));
                return prev.filter(e=>e.id!==id);
            }
            return prev;
        });

        setTimeout(() => {
            catManipulationFlag.current = false;
        }, 0);
    }

    const removeCat = (id:string)=>{

        if(catManipulationFlag.current){
            return;
        }

        catManipulationFlag.current = true;

        setRemovedCats(prev=>{
            const rem = cats.find(e=>e.id===id);
            if(rem){
                setcats(previ=>previ.filter(e=>e.id!==id));
                return [...prev, rem];
            }
            return prev;
        });

        setTimeout(() => {
            catManipulationFlag.current = false;
        }, 0);
    }

    const undoRemove = (id:string)=>{
        if(catManipulationFlag.current){
            return;
        }

        catManipulationFlag.current = true;

        setRemovedCats(prev => {
            const remed = prev.find(e => e.id === id);
            if(!remed) return prev;
            
            setcats(prevCats => {
                if(prevCats.some(cat => cat.id === id)) {
                    return prevCats;
                }
                return [...prevCats, remed];
            });
            
            return prev.filter(e => e.id !== id);
        });

        setTimeout(() => {
            catManipulationFlag.current = false;
        }, 0);
    };

    return(
        <div className="h-fit overflow-hidden flex items-center justify-center">
            <section className="w-full h-[69.8vh] p-6 mx-auto bg-gradient-to-b to-orange-400 from-orange-500 shadow-md dark:from-gray-700 dark:to-gray-800 ">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Edit User</h1>
                <form onSubmit={handleUserUpdate} className="mt-3">
                    <UserFormModel
                        id={initialData?.id as string}
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
                        breeds={breeds}
                        
                        cats={cats}
                        removedCats={removedCats}
                        removeCat={removeCat}
                        undoRemove={undoRemove}
                        updatedCats={updatedCats}
                        updateCat={updateCat}
                        undoUpdate={undoUpdate}

                        handleImageChange={handleImageChange}

                        handleDelete={handleDelete}
                    />
                    
                </form>
            </section>
        </div>
        
    )


}

export default UserUpdate;

