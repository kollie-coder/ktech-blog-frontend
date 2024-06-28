import React from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useLogin = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const login = async (inputs) => {
        if(!inputs.email || !inputs.password){
          alert("Please fill all the fields")
          return;
        }

        try {
           const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);   
           
           if(userCred) {
            const docRef = doc(firestore, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef);
            const userData = { ...docSnap.data(), uid: userCred.user.uid };
            localStorage.setItem("user-info", JSON.stringify(userData));
            return userData;
           }
       
        } catch (error) {
          alert(error.message);
        }
    }

  return {loading, error, login}
}

export default useLogin;