"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { auth, db } from "@/lib/firebase/init"
import { User, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { UserAttributes } from "@/components/admin/BackEnd/utils";

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

interface UserContextType{
  admin: boolean|null
  setAdmin:(e:boolean) => void
  money: number
  setMoney:React.Dispatch<React.SetStateAction<number>>
  experience: number
  setExperience:React.Dispatch<React.SetStateAction<number>>
  multiplier:number
  setMultiplier:React.Dispatch<React.SetStateAction<number>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Gabungkan AuthProvider dan AdminProvider menjadi satu komponen wrapper
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState<boolean|null>(null);
  const [money, setMoney] = useState<number>(0);
  const [experience, setExperience] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      console.log("Fetching user data");
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            const docdata = {id:docSnap.id, ...docSnap.data()} as UserAttributes;
            setAdmin(docdata.isAdmin || false);
            setMoney(docdata.money || 0);
            setExperience(docdata.experience || 0);
            setMultiplier(docdata.multiplier || 1);
          } else {
            setAdmin(false);
          }
        } catch (e) {
          console.error("Error fetching admin status:", e);
          setAdmin(false);
        }
      } else {
        setAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <UserContext.Provider value={{ admin, setAdmin, money, setMoney, experience, setExperience, multiplier, setMultiplier }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)
export const useUser = ():UserContextType => {
  const context = useContext(UserContext);
  if(!context){
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}