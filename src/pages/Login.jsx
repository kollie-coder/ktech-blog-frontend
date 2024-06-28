import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import useLogin from "../hooks/useLogin";



const Login = () => {

 const [inputs, setInputs] = useState({
    email:"",
    password:"",
  });

  const {loading, error, login} = useLogin();
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  const user = await login(inputs);
  if (user) {
    setCurrentUser(user);
    navigate("/");
  }
 }

  

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" 
        placeholder="email"
         value={inputs.email}
          onChange={(e) =>setInputs({...inputs,email:e.target.value})}
          />
        <input type="password" 
        placeholder="password"
         value={inputs.password}
          onChange={(e) =>setInputs({...inputs,password:e.target.value})}
         />

    {error && <div className="alert"> {error.message} </div>}
        <button disabled={loading} >
        {loading ? "Loading" : "Login" }
          </button>
        
        <span> Don't you have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login