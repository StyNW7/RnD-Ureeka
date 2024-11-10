"use client";

import Link from "next/link";
import { useAdmin } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase/init";
import { doc, getDoc } from "firebase/firestore";

const AdminLink = () => {
  const { admin } = useAdmin();

//    getDoc(doc(db, "users", auth.currentUser?.uid as string))
//     .then((doc) => setAdmin(doc.data()?.isAdmin))
//     .catch((e)=>console.error(e));



  return (
    <>
        {admin ?
            <Link
            className="fixed top-20 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded z-50"
            href="/adminonly"
            >
            🖥️
            </Link>
        :
            <></>
        }
    </>
  );
};

export default AdminLink; 