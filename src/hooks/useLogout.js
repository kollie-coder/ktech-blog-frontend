import React, { useContext } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { AuthContext } from '../context/authContext';

const useLogout = () => {

const [signOut, loading, error] = useSignOut(auth);

const { logout } = useContext(AuthContext);

const handleLogout = async () => {
    try {
        await signOut();
        logout();
        
    } catch (error) {
        alert(error);
    }
}

  return {handleLogout, loading, error}
}

export default useLogout