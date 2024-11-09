import { CollectionReference, Firestore, Query, Timestamp } from "firebase/firestore"
import { query, orderBy, where } from "firebase/firestore"
import { storage } from "@/lib/firebase/init"
import { ref, deleteObject } from "firebase/storage"

export interface CatsAttributes{
    id:string,
    breed: string,
    multiplier: number,
    price:number,
    name: string,
    picture: string
}

export const CatsAttributeType = {
    default: "name",
    id:"str",
    name: "str",
    breed: "str",
    multiplier:"num",
    multiplieru: "num+",
    multiplierd: "num-",
    picture: "str",
    price: "num",
    priceu: "num+",
    priced: "num-",
}

export interface UserAttributes{
    id:string,
    name:string,
    experience: number,
    isAdmin:boolean,
    money: number,
    multiplier: number,
    profpic:string,
    createdAt:Timestamp,
}

export const UserAttributesType = {
    default:"name",
    id:"str",
    createdAt:"tim",
    createdAtu:"tim+",
    createdAtd:"tim-",
    experience: "num",
    experienceu: "num+",
    experienced: "num-",
    isAdminu: "bol+",
    isAdmind: "bol-",
    money: "num",
    moneyu: "num+",
    moneyd: "num-",
    multiplier: "num",
    multiplieru: "num+",
    multiplierd: "num-",
    profpic:"str",
    name:"str"
}


export interface BreedAttributes{
    id:string,
    name:string,
    description:string,
    origin:string
}

export const BreedAttributesType = {
    default: "name",
    id: "str",
    name: "str",
    description: "str",
    origin: "str"
}

export const FileExt = ['.jpeg', '.png', '.jpg', '.webp', '.svg']


export const generateAutoId = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      autoId += chars[randomIndex];
    }
    return autoId // Save the generated ID in the component's state
  };

export const hanldeImageDelete = async(uid:string, StorageFolder:string): Promise<boolean>=>{
    let yesfound = false;
        await Promise.all(
            FileExt.map(async (ext) => {
                console.log("deleting file with name", uid, ext);
                if(!yesfound){
                    const fileRef = ref(storage, `${StorageFolder}/${uid}` + ext);
                    try {
                        await deleteObject(fileRef);
                        yesfound = true;
                        console.log(`File deleted successfully: ${`${StorageFolder}/${uid}` + ext}`);
                    } catch (error) {
                        if(ext === FileExt[FileExt.length-1]){
                            console.log(`File not found: ${`${StorageFolder}/${uid}` + ext}`);
                            console.log(`Error firebase storage file not found`);
                        }
                    }
                }
            })
        );
    if(yesfound){
        return true;
    } else {
        return false;
    }
}

export const querySortBuilder = (
    collectionref:CollectionReference, 
    attributeType:Record<string,string>,
    selectedattr:keyof typeof attributeType, 
    searchstr:string
):Query=>{
    if(attributeType[selectedattr] === "str"){
        const strq = searchstr.replace(/\b\w/g, c => c.toUpperCase());
        return strq.length > 0 ? 
            query(collectionref, 
                where(selectedattr, ">=", strq),
                where(selectedattr, "<", strq + "\uf8ff"),
                orderBy(selectedattr, "asc")
            )
        :
            query(collectionref, orderBy(selectedattr, "asc"));
      
    } else if(attributeType[selectedattr] === "num+"){
        const strq = parseFloat(searchstr);
        const attr = (selectedattr as string).slice(0, -1);
        return strq > 0 ? 
            query(collectionref, 
                where(attr, ">=", strq),
                orderBy(attr, "asc")
            ) 
        :
            query(collectionref, orderBy(attr, "asc"));
      
    } else if(attributeType[selectedattr] === "num-"){
        const strq = parseFloat(searchstr);
        const attr = (selectedattr as string).slice(0, -1);
        return strq > 0 ? 
            query(collectionref, 
                where(attr, "<=", strq),
                orderBy(attr, "asc")
            ) 
        :
            query(collectionref, orderBy(attr, "asc"));
    } else if(attributeType[selectedattr] === "bol+"){
        const strq = searchstr.replace(/\b\w/g, c => c.toUpperCase());
        const attr = (selectedattr as string).slice(0, -1);
        console.log(attributeType['default'] + " or " + attr + " <--> " + attr)
        return strq.length > 0 ? 
            query(collectionref, 
                where(attr, "==", true),
                where(attributeType['default'], ">=", strq),
                where(attributeType['default'], "<", strq + "\uf8ff"),
                orderBy(attributeType['default'], "asc")
            ) 
        :
            query(collectionref, 
                where(attr, "==", true), 
                orderBy(attributeType['default'], "asc")
            );
    } else if(attributeType[selectedattr] === "bol-"){
        const strq = searchstr.replace(/\b\w/g, c => c.toUpperCase());
        const attr = (selectedattr as string).slice(0, -1);
        return strq.length > 0 ? 
            query(collectionref, 
                where(attr, "==", false),
                where(attributeType['default'], ">=", strq),
                where(attributeType['default'], "<", strq + "\uf8ff"),
                orderBy(attributeType['default'], "asc")
            ) 
        :
            query(collectionref, 
                where(attr, "==", false), 
                orderBy(attributeType['default'], "asc")
            );
    } else if(attributeType[selectedattr] === "tim+"){
        const dateString = new Date(searchstr);
        const tstamp = Timestamp.fromDate(dateString);
        const attr = (selectedattr as string).slice(0, -1);
        return searchstr.length > 0 ? 
            query(collectionref, 
                where(attr, ">=", tstamp),
                orderBy(attr, "asc")
            )
        :
            query(collectionref, 
                orderBy(attr, "asc")
            );
    } else if(attributeType[selectedattr] === "tim-"){
        const dateString = new Date(searchstr);
        const tstamp = Timestamp.fromDate(dateString);
        const attr = (selectedattr as string).slice(0, -1);
        return searchstr.length > 0 ?
            query(collectionref,
                where(attr, "<=", tstamp),
                orderBy(attr, "desc")
            )
        :
            query(collectionref, 
                orderBy(attr, "desc")
            );
    } else {
        const isnum = !isNaN(Number(searchstr));
        const strq = isnum ? parseFloat(searchstr) : searchstr;
        if(isnum){
            return strq as number > 0 ? 
                query(collectionref, 
                    where(selectedattr, "==", strq),
                    orderBy(selectedattr, "asc")
                ) 
            :
                query(collectionref, orderBy("name", "asc"));
        } else {
            return (strq as string).length > 0 ? 
                query(collectionref, 
                    where(selectedattr, ">=", strq),
                    where(selectedattr, "<", strq + "\uf8ff"),
                    orderBy(selectedattr, "asc")
                ) 
            :
                query(collectionref, orderBy("name", "asc"));
        }
    }
}

export const formatToIndonesianCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
  };

export const stringCutter = (str:string, char_number:number): string =>{
    if(!str) return "Undefined";
    
    if(str.length > char_number){
        return str.slice(0, char_number-3) + "...";
    }
    return str;
}