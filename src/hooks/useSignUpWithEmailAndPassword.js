import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const signup = async (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
            alert("Please fill all the fields")
            return;
        }

        try {
          const usersRef = collection(firestore, "users");
          const q = query(usersRef, where("username", "==", inputs.username));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            alert("Username already exists");
            return;
          }


            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
            
            if(!newUser && error){
                console.log(error)
                return
            }
            console.log("User created:", newUser);

            if(newUser){
               const userDoc = {
                uid: newUser.user.uid,
                email: inputs.email,
                fullname: inputs.fullName,
                username: inputs.username, 
                posts: [],
                createdAt: Date.now(),
               }  
               await setDoc(doc(firestore, "users", newUser.user.uid), userDoc); 
               localStorage.setItem("user-info", JSON.stringify(userDoc));
               console.log("User document set in Firestore and localStorage");
            }
            
            
            
        } catch (error) {
          console.log(error)  
        }
      }
 
 
    return { loading,error,signup }
}

export default useSignUpWithEmailAndPassword