"use client"
import  React from "react"
import { BreedAttributes } from "../BackEnd/utils"

interface FormProps{
    errors: string|null,
    setname: (e:string)=>void,
    setdescription: (e:string)=>void,
    setorigin: (e:string)=>void,
    handleDelete?: ()=>Promise<void>
}

const BreedFormModel:React.FC<FormProps&BreedAttributes> = ({id, name, origin, description, errors, setname, setdescription, setorigin, handleDelete})=>{
    

    return (
            <>
                    
                    {errors && <div className="text-red-600 px-2 bg-white rounded-full">{errors}</div>}

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                            <input id="name" defaultValue={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder="Type your name here ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Description</label>
                            <input id="description" defaultValue={description} onChange={(e)=>setdescription(e.target.value)} type="text" placeholder="Description here ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Origin</label>
                            <input id="origin" defaultValue={origin} onChange={(e)=>setorigin(e.target.value)} type="text" placeholder="Origin ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-6">
                        { handleDelete!=undefined ? 
                            <button onClick={handleDelete} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Delete</button>
                        : <></> }
                        <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform text-center rounded-md bg-green-600 border border-green-600 active:text-green-500 hover:bg-green-700 focus:outline-none focus:ring">Save</button>
                    </div>
            </>
    )
}


export default BreedFormModel;