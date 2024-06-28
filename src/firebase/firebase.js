import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCvRTdV8LGc2dgV_KFzo3F2JikkNSIiUGs",
  authDomain: "ktech-blog.firebaseapp.com",
  projectId: "ktech-blog",
  storageBucket: "ktech-blog.appspot.com",
  messagingSenderId: "28417069508",
  appId: "1:28417069508:web:011e9a11e1c5ac1a7a1491",
  measurementId: "G-7DF5WGDF7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app); 
const storage = getStorage(app);

export {app, auth, firestore, storage};
