import { Timestamp } from "firebase/firestore"


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
    breedname:string,
    description:string,
    origin:string
}

export const BreedAttributesType = {
    id: "str",
    breedname: "str",
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
