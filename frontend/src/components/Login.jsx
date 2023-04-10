import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signIn } from '../store/authSlice';
import Side from "./Side";

function Login() {

  const { isAuth } = useSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/dashboard');
  }

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      setEmail(event.target.value);
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {

        
        const res = await fetch('https://login-backend-production.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const responseJson = await res.json();

        if(responseJson.success){
          localStorage.setItem('authToken', responseJson.token);
          dispatch(signIn( { user: responseJson.user, token: responseJson.token } ));

        } else{
          alert('User not found!');
          console.log(`error: `, responseJson.message);
        }



      } catch (error) {
        console.log(`error: `, error)
      }

      
  }

  if(isAuth){
    return <Navigate to='/dashboard'/>
  }

  return (
    <>
      <Side />

      <div className="form form-log">
        <form onSubmit={handleSubmit}>
          <h2>Sign in</h2>

          <h3>Email Address</h3>
          <input type="text" placeholder="Example@email.com" value={email} id="email" onChange={handleEmailChange} required />

          <h3>Password</h3>
          <input type="text" placeholder="Enter your password" value={password} id="password" onChange={handlePasswordChange} required />

          <div className="btn">
            <button
              className="button-active"
            >
              Sign in
            </button>
            <Link to='/register' className="link">
                <button className="button-inactive">
                Sign up
                </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login