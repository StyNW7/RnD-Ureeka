/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "@/lib/firebase/init";
import { getAuth } from "firebase/auth";
import HourGlass from "@/components/ui/hourGlass/hourGlass";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/auth")
      }
    }, [user, loading, router])

    if (loading || !user) {
      return <HourGlass />
    }

    return <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth