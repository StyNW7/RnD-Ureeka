"use client"
import { db } from "@/lib/firebase/init";
import UserPillTopRight from "@/pages/userpilltopright";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useCallback, useRef } from "react";
import { doc, DocumentReference, getDoc, Timestamp } from "firebase/firestore";
import { CatsAttributes, UserAttributes, stringCutter } from "@/components/admin/BackEnd/utils";
import HourGlass from "@/components/ui/hourGlass/hourGlass";
import styles from "@/styles/clickerbg.module.css"
import Image from "next/image";
import {useTheme } from "@/context/ThemeContext";
import withAuth from "@/hoc/withAuth";
import { useUser } from "@/context/AuthContext";

const ClickerPage: React.FC = () => {
  const expmultiplier = 50; // every level user get extra multiplier
  const baseMultiplier = 1000; // 1 click how much base money added
  const posibleLinks = ["Home", "Shop", "Clicker", "Account"];

  const [userinstance, setUserinstance] = useState<UserAttributes>();
  const {theme} = useTheme();
  const {money, setMoney, experience, setExperience, multiplier} = useUser();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [clicked, setclicked] = useState<boolean>(false);
  const [usermultiplier, setUsermultiplier] = useState<number>(1);
  const moneyref = useRef(money);
  const expref = useRef(experience);

  const auth = getAuth();

  const pawclicked = ()=>{
    setclicked(true);
    console.log("clicked" + usermultiplier);
    setTimeout(() => {
      setclicked(false);
    }, 300);

    setMoney(money + (baseMultiplier*usermultiplier + Math.floor(experience/500)*expmultiplier));
    setExperience(experience+1);
  }

  const handleUnload = async(event:BeforeUnloadEvent|MouseEvent)=>{
    if(event instanceof MouseEvent){
      if(!posibleLinks.includes((event.target as HTMLElement).textContent || (event.target as HTMLInputElement).value)){
        return;
      }
    } else if( event instanceof BeforeUnloadEvent){
      event.preventDefault();
    }
    
    console.log("Saving user data money." + moneyref.current + " exp." + expref.current);
    navigator.sendBeacon('/api/updateUser', JSON.stringify({
      uid: auth.currentUser?.uid as string,
      money: moneyref.current,
      experience: expref.current
    }));
  }

  const loadUserInformation = useCallback(async(docref:DocumentReference)=>{
    if(isLoading){return;}

    const docSnap = await getDoc(docref);

    if (docSnap.exists()) {
      const user = docSnap.data() as UserAttributes;
      user.id = docSnap.id;
      if(user){
        setUserinstance(user);
      }
    } else {
      console.error(`User not found, ID ${getAuth().currentUser?.uid} such document!`);
      throw new Error(`User not found, ID ${getAuth().currentUser?.uid} such document!`);
    }
  }, [
    isLoading,
  ]);

  useEffect(()=>{
    moneyref.current = money;
    expref.current = experience;
  }, [money, experience]);
  
  useEffect(()=>{
    setisLoading(true);
    let docref:DocumentReference|undefined = undefined;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        docref = doc(db, "users", user?.uid as string);
        console.log("User is signed in with UID:", user?.uid);
        try{
          await loadUserInformation(docref);
          setUsermultiplier(multiplier);
          setisLoading(false); 
        } catch (e){
            console.log(e);
        }
      } else {
        console.log("User is not signed in.");
      }
    });

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('click', handleUnload);
    
    return ()=>{
      
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('click', handleUnload);
    }

  }, []);

  
  if(isLoading){
    return (
        <HourGlass />
    )
  } else {
    return (
      <>
        <div className="flex items-center justify-center">
          <section className={`${styles.cloud} h-[100vh] bg-blue-400 dark:bg-blue-950`}>
            <div className={styles.air + " " + styles.air1}></div>
            <div className={styles.air + " " + styles.air2}></div>
            <div className={styles.air + " " + styles.air3}></div>
            <div className={styles.air + " " + styles.air4}></div>
          </section>
          <Image 
            width={1000}
            height={1000}
            className="absolute w-32 h-auto top-12 left-0 pointer-events-none"
            src="/gif/nyancat.gif"
            alt="nyan cat flying by"
            loading="lazy"
            unoptimized
          />

          <Image 
            width={1000}
            height={1000}
            className="absolute w-28 h-auto bottom-0 right-10 pointer-events-none"
            src="/gif/catSyndrome.gif"
            alt="nyan cat flying by"
            loading="lazy"
            unoptimized
          />

          <div className={`rounded-full bg-yellow-500 dark:bg-cyan-800 absolute p-8 pointer-events-none flex justify-center items-center ${clicked ? "animate-clicker-effect" : "animate-clicker-spin"}`}>
            <div
              onClick={pawclicked}
              className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-auto z-10"
            />
            <div className="rounded-full bg-orange-600 dark:bg-blue-800 p-8 flex justify-center items-center pointer-events-none">
              <Image 
                src={theme==="light" ? "/svg/PawLight.svg" : "/svg/DarkPaw.svg"}
                height={1000}
                width={1000}
                className="w-[30vw] h-auto rounded-b-full pointer-events-none"
                alt="paw"
                loading="lazy"
              />
            </div>
          </div>
          <h1 className="h-[100vh] w-full">Clicker interaction page</h1>
          <UserPillTopRight 
            id= {userinstance?.id as string}
            createdAt={userinstance?.createdAt as Timestamp}
            experience={experience as number}
            isAdmin={userinstance?.isAdmin as boolean}
            money={money as number}
            multiplier={userinstance?.multiplier as number}
            name={stringCutter(userinstance?.name as string, 15)}
            profpic={userinstance?.profpic as string}
            cats={userinstance?.cats as Array<CatsAttributes>}
          />
        </div>
      </>
    );
  }
};
  
  export default withAuth(ClickerPage);