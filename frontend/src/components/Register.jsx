import React, { useState } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Side from './Side';

function Register() {

  const { isAuth } = useSelector(state => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/dashboard');
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setName('');
    setEmail('');
    setPassword('');

    try {
        const res = await fetch('https://login-backend-production-f9fc.up.railway.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })

    });
    
        const responseJson = await res.json();

        if(responseJson.success){
          alert('Cuenta creada exitosamente');
        } else {
            console.log(`error: ${responseJson.message}`)
        }

        redirect();

    } catch (error) {
        console.log(`failed: `, error);
    }
      
  }

  if(isAuth){
    return <Navigate to='/dashboard'/>
  }


  return (
    <>
      <Side />

      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2>Create your account</h2>
          <h3>Name</h3>
          <input type="text" placeholder="Enter your name" value={name} id="name" onChange={handleNameChange} required />

          <h3>Email Address</h3>
          <input type="text" placeholder="Example@email.com" value={email} id="email" onChange={handleEmailChange} required />

          <h3>Password</h3>
          <input type="text" placeholder="Enter your password" value={password} id="password" onChange={handlePasswordChange} required />

          <div className="conditions">
            <input type="checkbox" required />
            <p>
              I agree to <span>Terms & Policys</span>
            </p>
          </div>

          <div className="btn">
            <button type="submit" className="button-active">
              Sign up
            </button>
            <Link to='/' className="link">
              <button
                className="button-inactive"
              >
                Sign in
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register