import { CollectionReference, Query, Timestamp } from "firebase/firestore"
import { query, orderBy, where } from "firebase/firestore"

export interface CatsAttributes{
    id:string,
    breed: string,
    multiplier: number,
    price:number,
    name: string,
    picture: string
}

export const CatsAttributeType = {
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
    createdAt:Timestamp,
    experience: number,
    isAdmin:boolean,
    money: number,
    multiplier: number,
    profpic:string,
    username:string
}

export const UserAttributesType = {
    id:"str",
    createdAt:"tim",
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
    username:"str"
}


export interface BreedAttributes{
    id:string,
    name:string,
    description:string,
    origin:string
}

export const BreedAttributesType = {
    id: "str",
    name: "str",
    description: "str",
    origin: "str"
}

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
