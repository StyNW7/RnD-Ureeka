import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";


export async function POST(request:Request){
    const resp = await request.json();
    const {uid, money, experience} = resp;

    if (!uid) {
        return new Response('UserID or uid is required.', { status: 400 });
    }
    
    const docref = doc(db, "users", uid as string);
    
    
    const updateparam:{[key:string]:any} = {};
    
    if(!money && !experience){
        return new Response('Money and experience are required.', { status: 400 });
    }else if(!experience && money > 0){
        updateparam['money'] = money;
    }else if(!money && experience > 0){
        updateparam['experience'] = experience;
    }else if(money > 0 && experience > 0){
        updateparam['money'] = money;
        updateparam['experience'] = experience;
    }

    try{
        await updateDoc(docref, updateparam);
    } catch(error){
        return new Response('UserID is not recognized.', { status: 400});
    }
    return NextResponse.json(resp);
}