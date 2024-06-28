import React, { useState } from 'react'
import { auth, firestore, storage } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const useCreatePost = () => {
 const [isLoading, setIsLoading] = useState(false);
 //Get the authenticated user state
 const [user, loading, error] = useAuthState(auth); 
 const {pathname} = useLocation()  

const handleCreatePost = async ( title, desc, cat, selectedFile ) => {
    if(!selectedFile) throw new Error('Please select an image');
    setIsLoading(true);
    const newPost = {
        title: title,
        desc: desc,
        cat: cat,
        createdAt: Date.now(),
        createdBy: user.uid,
    }  
    
    try {
        const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
        const userDocRef = doc(firestore, "users", user.uid);
        const imageRef = ref(storage, `posts/${postDocRef.id}`);
  
        await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
  
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
          const dataURL = reader.result;
          await uploadString(imageRef, dataURL, "data_url");
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(postDocRef, { imageURL: downloadURL });
          newPost.imageURL = downloadURL;
          alert("Post created successfully");
          setIsLoading(false);
        };
  
        reader.onerror = () => {
          setIsLoading(false);
          throw new Error('Failed to read the file');
        };
      } catch (error) {
        alert(error.message);
        setIsLoading(false);
      }
    };
  


  return {isLoading, handleCreatePost }
}

export default useCreatePost