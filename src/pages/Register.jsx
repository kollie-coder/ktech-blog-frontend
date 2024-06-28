import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from '../hooks/useSignUpWithEmailAndPassword';
import { AuthContext } from '../context/authContext';

const Register = () => {
 const [inputs, setInputs] = useState({
    username:"",
    fullName:"",
    email:"",
    password:"",
  });

    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      const user = await signup(inputs);
      if (user) {
        setCurrentUser(user);
        navigate('/');
      }
    };



  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
          <input required 
          type="text"
          placeholder="username"
          name='username'
          value={inputs.username}
          onChange={(e) =>setInputs({...inputs,username:e.target.value})} 
          />
          <input required 
          type="text" 
          placeholder="full name" 
          value={inputs.fullName}
          onChange={(e) =>setInputs({...inputs,fullName:e.target.value})}
          />
          <input required 
          type="email"
          placeholder="email"
          value={inputs.email}
          onChange={(e) =>setInputs({...inputs,email:e.target.value})}
          />
          <input required 
          type="password" 
          placeholder="password"  
          value={inputs.password}
          onChange={(e) =>setInputs({...inputs,password:e.target.value})}
          />
        
        {error && <div className="alert"> {error.message} </div>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        
        <span> Do you have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register