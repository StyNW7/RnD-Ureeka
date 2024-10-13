/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import React, { useState } from "react"
import { auth, db, storage } from "@/lib/firebase/init"
import { doc, setDoc } from "firebase/firestore"
import { ref,  uploadBytes, getDownloadURL, UploadMetadata } from "firebase/storage"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { CardItem } from "@/components/ui/3d-card";
import { LuUpload } from "react-icons/lu"

interface SignupProp{
  setIsLogin: (e: boolean)=>void
}

const Signup: React.FC<SignupProp> = ({setIsLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const defaultprofpiclink = "https://firebasestorage.googleapis.com/v0/b/new-meow.appspot.com/o/UserProf%2Fuser_profile_placeholder.jpg?alt=media&token=a366036e-6af2-4127-9846-6823a8d7b612";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);

        // Create a preview URL using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string); // Set the preview URL in state
        };
        reader.readAsDataURL(selectedFile); // Read the image file as a data URL
    }
  };

  const handleUpload = async (uid: String): Promise<null|string> => {
    if (image) {
      const imagetype = image.name.split('.').pop();
      const storageRef = ref(storage, `UserProf/${uid}.${imagetype}`);

      const metadata: UploadMetadata = {
        contentType: image.type,
      }

      try {
          await uploadBytes(storageRef, image, metadata);
          console.log('Image upload successful!');

          const downloadUrl = await getDownloadURL(storageRef)

          setPreviewUrl(null);
          setImage(null);

          return downloadUrl;
      } catch (error) {
        console.error('Upload failed:', error);
        return null;
      }
    } else {
      return null;
    }
  };

  const validateUsername = (usern:string)=>{
    if(usern.length < 3){
      throw new Error("Username needs at least 3 character");
    } else if(!(/^[a-zA-Z0-9_]+$/.test(usern))){
      throw new Error("Username has to be Alphanumerical or '_'");
    }
  }


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      validateUsername(username);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      const uploaded = await handleUpload(user.uid);

      // Step 3: Store the user in Firestore under the "users" collection
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        experience: 0,
        money: 0,
        multiplier: 1,
        profpic: uploaded ? uploaded : defaultprofpiclink,
        isAdmin: false,
        createdAt: new Date(),
        cats: []
      });

      setIsLogin(true);

    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto p-4">
      <CardItem 
        className="w-full"
        translateZ="60"
        translateY="-10"
      >
        <h2 className="text-2xl mb-4 font-extrabold">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
      </CardItem>
      <CardItem
        className="w-full"
        translateZ={80}
        rotateX={10}
      >
        <label htmlFor="imageUpload" className="cursor-pointer block w-full h-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 bg-black opacity-30 rounded-full w-16 h-16" />
          <LuUpload className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white z-10"/>
          <img
            src={ previewUrl ? previewUrl : defaultprofpiclink }
            height={1000}
            width={1000}
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl z-0"
            alt="Profile Picture"
          />
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden z-10"
          onChange={handleImageChange}
        />
      </CardItem>
      <CardItem 
        className="my-4 w-full "
        translateZ={100}
        rotateX={10}
        translateY={10}
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
              <input 
                id="username" 
                name="username" 
                type="username" 
                autoComplete="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                required 
                />
          </div>
        </div>
      </CardItem>
      <CardItem 
        className="mb-4 w-full"
        translateZ={120}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                required 
                />
          </div>
        </div>

      </CardItem>
      <CardItem 
        className="mb-4 w-full"
        translateZ={100}
        rotateX={-10}
        translateY={-10}
      >
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                required 
                />
          </div>
        </div>
      </CardItem>
      <CardItem
        className="mt-10 w-full"
        translateZ={60}
        rotateX={-15}
      >
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Sign Up
        </button>
      </CardItem>
    </form>
  )
}

export default Signup
