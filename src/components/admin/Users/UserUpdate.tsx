"use client"

import { query, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, writeBatch, arrayRemove, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadMetadata, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase/init";
import React, { useRef, useCallback } from "react";
import { useState, useEffect } from "react";
import { BreedAttributes, CatsAttributes, UserAttributes, UserAttributesType, hanldeImageDelete, isUserAttributes } from "@/components/admin/BackEnd/utils";
import UserFormModel from "@/components/admin/Users/UserFormModel";


interface CreateProp{
    setselection: (e:number)=>void
    objectPlaceHolder:CatsAttributes|UserAttributes|BreedAttributes|null
    setObjectPlaceHolder:React.Dispatch<React.SetStateAction<CatsAttributes|UserAttributes|BreedAttributes|null>>
}



const UserUpdate: React.FC<CreateProp> = ({setselection, objectPlaceHolder, setObjectPlaceHolder})=>{

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
    const [image, setimage] = useState<File|null>(null);
    const [errors, setErrors] = useState<string | null>(null);
    const [breeds, setbreeds] = useState<string[]>([]);
    const catManipulationFlag = useRef(false);

    useEffect(() => {
        const fetchalldata = async () => {
            
            if(!isUserAttributes(objectPlaceHolder)){
                setselection(6);
                setObjectPlaceHolder(null);
                return;
            }

            setName(objectPlaceHolder.name);
            setExperience(objectPlaceHolder.experience.toString());
            setIsAdmin(objectPlaceHolder.isAdmin);
            setMoney(objectPlaceHolder.money.toString());
            setprofpic(objectPlaceHolder.profpic);
            setmultiplier(objectPlaceHolder.multiplier.toString());
            setcats(objectPlaceHolder.cats);
            setObjectPlaceHolder(null);
            
            const breedq = await getDocs(query(collection(db,"breed")));

            const docs:BreedAttributes[] = breedq.docs.map((doc) => ({id:doc.id, ...doc.data()}) as BreedAttributes);
            setbreeds(docs.map((doc: BreedAttributes) => doc.name));
        };
            
        fetchalldata();
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
        if (image && profpic && profpic != (objectPlaceHolder as UserAttributes)?.profpic) {
            if(!(objectPlaceHolder as UserAttributes)?.id){
                throw new Error("Oops! Document ID is not available, Maybe it got lost on the process")
            }
            await hanldeImageDelete((objectPlaceHolder as UserAttributes)?.id, StorageFolder)
            
            const imagetype = image.name.split('.').pop();
            const storageRef = ref(storage, `${StorageFolder}/${uid + "." + imagetype}`);
        
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
            console.log('Image not updated continue...');
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


    // This function will be re-initialized every time the component re-renders due to state changes
    // Since it's defined inside the component and uses state variables (name, experience, isAdmin, etc)
    // React will create a new function instance with the latest state values on each render
    const handleUserUpdate = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            validateParameters();
            
            const docref = doc(db, CollectionName, ((objectPlaceHolder as UserAttributes)?.id as string));
            const imglink = await handleUpload(docref.id);

            if((objectPlaceHolder as UserAttributes)?.isAdmin === false && isAdmin){
                const docadminref = doc(collectionAdminref);
                await setDoc(docadminref, {
                    adminID: (objectPlaceHolder as UserAttributes).id
                });
            } else if((objectPlaceHolder as UserAttributes)?.isAdmin === true && !isAdmin) {
                const docadminref = doc(collectionAdminref, (objectPlaceHolder as UserAttributes).id);
                try{
                    await deleteDoc(docadminref);
                    console.log("Admin removed successfully");
                } catch (error){
                    console.error("Admin removing not completed, "+ error);
                }
            }

            const batch = writeBatch(db);

            const docdata:any = {}

            if(name !== (objectPlaceHolder as UserAttributes).name) docdata["name" as keyof UserAttributes] = name;
            if(Number(experience) !== (objectPlaceHolder as UserAttributes).experience) docdata["experience" as keyof UserAttributes] = Number(experience);
            if(isAdmin !== (objectPlaceHolder as UserAttributes).isAdmin) docdata["isAdmin" as keyof UserAttributes] = isAdmin;
            if(Number(money) !== (objectPlaceHolder as UserAttributes).money) docdata["money" as keyof UserAttributes] = Number(money);
            if(Number(multiplier) !== (objectPlaceHolder as UserAttributes).multiplier) docdata["multiplier" as keyof UserAttributes] = Number(multiplier);
            if((imglink ? imglink : (objectPlaceHolder as UserAttributes)?.profpic) !== (objectPlaceHolder as UserAttributes).profpic) docdata["profpic" as keyof UserAttributes] = (imglink ? imglink : (objectPlaceHolder as UserAttributes)?.profpic);

            batch.update(docref, docdata);

            // const updatedOriginals = [...(objectPlaceHolder as UserAttributes).cats.filter(e=>updatedCats.some(el=>el.id === e.id)), ...(objectPlaceHolder as UserAttributes).cats.filter(e=>removedCats.some(el=>el.id===e.id))]
            // this below is a more optimized solution because we don't need to filter multiple times through objectPlaceHolder.cats
            
            if(updatedCats.length>0 || removedCats.length>0){
                const updatedIDs = new Set(updatedCats.map(e=>e.id));
                const removedIDs = new Set(removedCats.map(e=>e.id));
    
                const needToRemove = (objectPlaceHolder as UserAttributes).cats
                                        .filter(e=>updatedIDs.has(e.id)||removedIDs.has(e.id));
                                        // .map(e=>e.id);
                
                if(needToRemove.length>0){
                    batch.update(docref, { cats: arrayRemove(...needToRemove) });
                }
    
                if(updatedIDs.size > 0){batch.update(docref, { cats: arrayUnion(...updatedCats) });}
            }

            try{
                await batch.commit();
            } catch(e){
                console.error("Update unsucessful error: ", e);
            }

            setObjectPlaceHolder(null);
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
        const docref = doc(db, CollectionName, ((objectPlaceHolder as UserAttributes)?.id as string));
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

        const hasBeenUpdated = updatedCats.some(e => e.id === id);

        if (!hasBeenUpdated) {
            // Find original cat
            const originalCat = cats.find(e => e.id === id);
            
            if (originalCat) {
                // Create updated version
                const updatedCat = {
                    ...originalCat,
                    [attr]: value
                };
                // Update states
                setcats(prev => prev.filter(e => e.id !== id));
                setUpdatedCats(prev => [...prev, updatedCat]);
            }
        } else {
            // Update existing cat in updatedCats
            setUpdatedCats(prev => 
                prev.map(cat => 
                    cat.id === id ? {...cat, [attr]: value} : cat
                )
            );
        }

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
            if(prev.some(e=>e.id===id)){
                return prev.filter(e=>e.id!==id);
            }
            return prev;
        });
        
        
        const ori = (objectPlaceHolder as UserAttributes).cats.find(e=>e.id===id); 
        setcats(prevCats=>{
            if(prevCats.some(cat => cat.id === id) || !ori) {
                return prevCats;
            }
            return [...prevCats, ori];
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
                return [...prev, rem];
            }
            return prev;
        });

        setcats(previ=>previ.filter(e=>e.id!==id));

        setTimeout(() => {
            catManipulationFlag.current = false;
        }, 0);
    }

    const undoRemove = (id:string)=>{
        if(catManipulationFlag.current){
            return;
        }

        catManipulationFlag.current = true;

        setRemovedCats(prev => prev.filter(e => e.id !== id));
        
        setcats(prevCats => {
            const remed = removedCats.find(e => e.id === id);
            if(prevCats.some(cat => cat.id === id)) {
                return prevCats;
            }
            if(!remed) return prevCats;
            return [...prevCats, remed];
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
                        id={(objectPlaceHolder as UserAttributes)?.id as string}
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

