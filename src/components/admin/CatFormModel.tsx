"use client"
import  React, { HtmlHTMLAttributes }  from "react"
import { CatsAttributes } from "./BackEnd/utils"
import Image from "next/image"

interface FormProps{
    errors: string|null,
    setname: (e:string)=>void,
    setbreed: (e:string)=>void,
    setmultiplier: (e:string)=>void,
    setprice: (e:string)=>void,
    handleImageChange: (e:React.ChangeEvent<HTMLInputElement>)=>void,
    image: File|null,
    breedOptions: string[],
}

type EditedCatsAttributes = Omit<CatsAttributes, 'multiplier'|'price'|'picture'> & {
    multiplier: string,
    price: string,
    picture: string|null
}

const CatFormModel:React.FC<FormProps&EditedCatsAttributes> = ({id,breed,multiplier,price,name,picture, errors, setname, setbreed, setmultiplier, setprice, breedOptions, image, handleImageChange})=>{
    

    return (
            <>
                    
                    {errors && <div className="text-red-600 px-2 bg-white rounded-full">{errors}</div>}

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="name">Name</label>
                            <input id="name" defaultValue={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder="Type your name here ..." className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="breed">Breed</label>
                            <select id="breed" value={breed} onChange={(e)=>setbreed(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                {breed ? (
                                    <option value={breed}>{breed}</option>
                                ) : (
                                    <option value="">Pilih Breed</option>
                                )}
                                {breedOptions
                                    .filter(breedname => breedname !== breed)
                                    .map((breedname) => (
                                        <option key={breedname} value={breedname}>{breedname}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="price">Price</label>
                            <input id="price" defaultValue={price} onChange={(e)=>setprice(e.target.value)} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="multiplier">Multiplier</label>
                            <input id="multiplier" defaultValue={multiplier} step="any" onChange={(e)=>setmultiplier(e.target.value)} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <label htmlFor="file-upload" className="w-72 h-72">
                            <div className="block text-sm font-medium text-white">
                                Image
                            </div>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 w-80 h-80 border-gray-300 border-dashed rounded-md">
                                {
                                   picture === null ? 
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
                                                src={picture ===null ? "" : picture}
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


export default CatFormModel;