"use client"
import  React from "react"
import { UserAttributes } from "@/components/admin/BackEnd/utils"
import Image from "next/image"

interface FormProps{
    errors: string|null,
    setname: (e:string)=>void,
    setmultiplier: (e:string)=>void,
    setmoney: (e:string)=>void,
    setexperience: (e:string)=>void,
    setisAdmin: (e:string)=>void,
    handleImageChange: (e:React.ChangeEvent<HTMLInputElement>)=>void,
}

type EditedUserAttributes = Omit<UserAttributes, 'multiplier'|'money'|'profpic'|'experience'|'createdAt'|'id'> & {
    multiplier: string,
    money: string,
    experience: string,
    profpic: string | null,
    createdAt?: Date,
    id?: string
}

const UserFormModel:React.FC<FormProps&EditedUserAttributes> = ({id, multiplier, name, money, experience, isAdmin, profpic, errors, setname, setmultiplier, setmoney, setexperience, setisAdmin, handleImageChange})=>{
    

    return (
            <>
                    
                    {errors && <div className="text-red-600 px-2 bg-white rounded-full">{errors}</div>}

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                            <input id="name" defaultValue={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder="Type your name here ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="experience">Experience</label>
                            <input id="experience" defaultValue={experience} onChange={(e)=>setexperience(e.target.value)} type="number" placeholder="Type your experience here ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="money">Money</label>
                            <input id="money" defaultValue={money} onChange={(e)=>setmoney(e.target.value)} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="multiplier">Multiplier</label>
                            <input id="multiplier" defaultValue={multiplier} step="any" onChange={(e)=>setmultiplier(e.target.value)} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div className="flex flex-col ">
                            <label className="text-white dark:text-gray-200" htmlFor="isadmin">Is an Admin</label>
                            <select
                                id="isadmin"
                                onChange={(e) => setisAdmin(e.target.value)}
                                value={String(isAdmin)}
                                className="px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </select>
                        </div>
                        <label htmlFor="file-upload" className="w-72 h-72">
                            <div className="block text-sm font-medium text-white">
                                Image
                            </div>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 w-80 h-80 border-gray-300 border-dashed rounded-md">
                                {
                                   profpic === null ? 
                                        ((<div className="space-y-1 text-center my-auto">
                                            <svg className="mx-auto h-32 w-32 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div className="flex justify-center text-sm text-gray-600">
                                                <label htmlFor="file-upload" className=" relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span className="text-lg">Upload an image</span>
                                                </label>
                                            </div>
                                            <p className="text-lg text-white">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                        )
                                        )
                                    :
                                        (
                                            <Image
                                                src={profpic ===null ? "" : profpic}
                                                height={1000}
                                                width={1000}
                                                className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl z-0"
                                                alt="Profile Picture"
                                                loading="lazy"
                                            />
                                        )

                                }
                            </div>
                            <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </label>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
            </>
    )
}


export default UserFormModel;