"use client"

import { UserAttributes } from "@/components/admin/BackEnd/utils"
import UserPill from "./userprofpill"
import Image from "next/image"
import React from "react"

const UserPillTopRight: React.FC<UserAttributes> = (propss)=>{
    return (
        <div className="fixed top-0 w-full flex py-6 px-5">
            <UserPill {...propss}/>
        </div>
    )
}

export default UserPillTopRight;