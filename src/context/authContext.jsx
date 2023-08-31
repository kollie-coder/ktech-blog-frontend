import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
      
       // Save the token to local storage
       localStorage.setItem("token", res.data.access_token);
      
       setCurrentUser(res.data);
  
   
  };

  const logout = async () => {
    // Clear the localStorage
    localStorage.removeItem("currentUser");
    
    // Clear the currentUser state
    setCurrentUser(null);
    
    // Perform any additional logout-related actions
    // For example: make a request to the backend to clear session
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};