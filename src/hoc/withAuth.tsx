/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push("/auth")
      }
    }, [user, loading, router])

    if (loading || !user) {
      return <p className="text-center mt-10">Loading...</p>
    }

    return <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth