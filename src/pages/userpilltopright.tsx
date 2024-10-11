"use client"

import UserPill from "./userprofpill"

export default function UserPillTopRight(){
    return (
        <div className="fixed top-0 right-0 w-full flex justify-end py-10 px-5">
            <UserPill />
        </div>
    )
}