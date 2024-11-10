"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { auth, db } from "@/lib/firebase/init"
import { User, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

interface AdminContextType{
  admin: boolean|null
  setAdmin:(e:boolean) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Gabungkan AuthProvider dan AdminProvider menjadi satu komponen wrapper
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState<boolean|null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      console.log("Fetching user data");
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            setAdmin(docSnap.data()?.isAdmin || false);
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
      <AdminContext.Provider value={{ admin, setAdmin }}>
        {children}
      </AdminContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)
export const useAdmin = ():AdminContextType => {
  const context = useContext(AdminContext);
  if(!context){
    throw new Error('useAdmin must be used within a AuthProvider');
  }
  return context;
}