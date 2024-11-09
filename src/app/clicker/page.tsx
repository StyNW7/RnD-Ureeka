"use client"
import { db } from "@/lib/firebase/init";
import UserPillTopRight from "@/pages/userpilltopright";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useCallback, use } from "react";
import { collection, CollectionReference, doc, DocumentReference, getDoc, Timestamp } from "firebase/firestore";
import { UserAttributes, stringCutter } from "@/components/admin/BackEnd/utils";
import HourGlass from "@/components/ui/hourGlass/hourGlass";
import styles from "@/styles/clickerbg.module.css"
import Image from "next/image";
import { error } from "console";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

interface managedAttribute{
  money:number,
  experience:number
}

const ClickerPage: React.FC = () => {
  const [userinstance, setUserinstance] = useState<UserAttributes>();
  const {theme} = useTheme();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [money, setmoney] = useState<number>(0);
  const [experience, setexperience] = useState<number>(0);
  const [clicked, setclicked] = useState<boolean>(false);
  const [usermultiplier, setUsermultiplier] = useState<number>(1);
  
  const auth = getAuth();

  const pawclicked = ()=>{
    setclicked(true);
    console.log("clicked");
    setTimeout(() => {
      setclicked(false);
    }, 300);

    setmoney(money + 10000 * usermultiplier);
    setexperience(experience+1);

  }

  useEffect(()=>{
    setisLoading(true);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
  
        // console.log("User is signed in with UID:", user.uid);
        const docref = doc(db, "users", auth.currentUser?.uid as string);

        try{
          const usrinf = await loadUserInformation(docref);
          if(usrinf){
            setmoney(usrinf.money);
            setexperience(usrinf.experience);
            setisLoading(false); 
          } else {
            throw new Error("money and exp not set");
          }
        } catch (e){
            console.log(e);
        }
      } else {
        console.log("User is not signed in.");
      }
    });

  }, []);

  const loadUserInformation = useCallback(async(docref:DocumentReference):Promise<managedAttribute|undefined>=>{
    if(isLoading) return undefined;

    const docSnap = await getDoc(docref);

    if (docSnap.exists()) {
      const user = docSnap.data() as UserAttributes;
      user.id = docSnap.id;
      if(user){
        setUserinstance(user);
      }
      return {
        money:user.money as number, 
        experience:user.experience as number
      }
      // console.log(docSnap.data());
    } else {
      console.error(`User not found, ID ${getAuth().currentUser?.uid} such document!`);
      throw new Error(`User not found, ID ${getAuth().currentUser?.uid} such document!`);
    }
  }, [
    isLoading,
  ]);
  
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
            className="absolute w-32 h-auto top-12 left-0"
            src="/gif/nyancat.gif"
            alt="nyan cat flying by"
            loading="lazy"
          />

          <Image 
            width={1000}
            height={1000}
            className="absolute w-28 h-auto bottom-0 right-10"
            src="/gif/catSyndrome.gif"
            alt="nyan cat flying by"
            loading="lazy"
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
          />
        </div>
      </>
    );
  }

};
  
  export default ClickerPage;