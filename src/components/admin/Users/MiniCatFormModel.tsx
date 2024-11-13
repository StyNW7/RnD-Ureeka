import Image from "next/image"
import { CatsAttributes } from "../BackEnd/utils"
import { LuSkipBack, LuStepBack, LuUpload } from "react-icons/lu"

interface MiniCatProps{
    e: CatsAttributes
    breeds: string[]
    formType: "updated"|"original"|"removed"
    removeCat: (id:string)=>void
    undoRemove: (id:string)=>void
    updateCat: <K extends Exclude<keyof CatsAttributes, "id">>(id:CatsAttributes["id"], attr:K, value:CatsAttributes[K])=>void
    undoUpdate: (id:string)=>void
}

const MiniCatFormModel:React.FC<MiniCatProps> = ({ e, breeds, removeCat, updateCat, undoRemove, undoUpdate, formType})=>{
    return (
        <div className={`p-1 border border-gray-600 dark:border-white dark:border-opacity-50 rounded-xl ${ formType==="original" ? "dark:bg-gray-400 bg-blue-400" : ( formType==="updated" ? "bg-orange-400 dark:bg-amber-900" : ( formType==="removed" ? "bg-rose-400 dark:bg-fuchsia-800" : "bg-white") )} w-full h-20 flex items-center`}>
            <div className="h-16 w-16 border rounded-xl flex items-center overflow-hidden">
                <Image 
                    width={1000}
                    height={1000}
                    src={e.picture}
                    alt={ "Cat " + e.name + "'s picture" }
                    className="rounded-xl bg-white w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col ml-2 w-44">
                <label htmlFor="catname" className="text-white dark:text-gray-200">Name</label>
                { formType!=="removed" ? 
                        <input type="text" onBlur={element=>updateCat(e.id, "name", element.target.value)} defaultValue={e.name} placeholder="Cat name" id="catname" className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    :
                        <p className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 rounded-md dark:text-gray-300 dark:border-gray-600">{ e.name }</p>
                }
            </div>
            <div className="flex flex-col ml-2 w-36">
                <label className="text-white dark:text-gray-200" htmlFor="breed">Breed</label>
                { formType!=="removed" ?
                        <select id="breed" onChange={element=>updateCat(e.id, "breed", element.target.value)} defaultValue={e.breed} className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            {e.breed ? (
                                <option value={e.breed}>{e.breed}</option>
                            ) : (
                                <option value="">Pilih Breed</option>
                            )}
                            {breeds
                                .filter(breedname => breedname !== e.breed)
                                .map((breedname) => (
                                    <option key={breedname} value={breedname}>{breedname}</option>
                                ))
                            }
                        </select>
                    :
                        <p className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 rounded-md dark:text-gray-300 dark:border-gray-600">{ e.breed }</p>
                    }
            </div>
            <div className="flex flex-col ml-2 w-20">
                <label className="text-white dark:text-gray-200" htmlFor="catmultiplier">Multiplier</label>
                { formType !== "removed" ? 
                        <input id="catmultiplier" onBlur={element=>updateCat(e.id, "multiplier", parseFloat(element.target.value))} defaultValue={e.multiplier} step="any" type="number" className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    :
                        <p className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 rounded-md dark:text-gray-300 dark:border-gray-600">{ e.multiplier }</p>
                    }
            </div>
            <div className="flex flex-col ml-2 w-40">
                <label className="text-white dark:text-gray-200" htmlFor="price">Price</label>
                { formType !== "removed" ?
                        <input id="price" onBlur={element=>updateCat(e.id, "price", parseInt(element.target.value))} defaultValue={e.price} step="any" type="number" className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    :    
                        <p className="block w-full px-2 py-1 mt-1 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 rounded-md dark:text-gray-300 dark:border-gray-600">{ e.price }</p>
                }

            </div>
            <button 
                className={`flex justify-center items-center ml-auto mr-3 w-10 h-10 rounded-full ${formType==="original" ? "bg-red-500 hover:bg-red-600" : (formType==="removed" ? "bg-green-400 hover:bg-green-500" : (formType==="updated" ? "bg-blue-400 hover:bg-blue-500" : "" ))} text-center text-4xl pb-1`}
                onClick={formType==="original" ? ()=>removeCat(e.id) : (formType==="removed" ? ()=>undoRemove(e.id) : (formType==="updated" ? ()=>undoUpdate(e.id) : ()=>{} ))}
                type="button"
            >
                { formType==="original" ?<p className="text-white">X</p>: (formType==="removed" ? <LuUpload /> : (formType==="updated" ? <LuSkipBack /> : <></> ))}
            </button>
        </div>
    )
}

export default MiniCatFormModel;