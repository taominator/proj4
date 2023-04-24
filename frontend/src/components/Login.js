// Login page component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Login.css'
import { useContext } from "react";
import { AuthContext } from "./AuthContext.js";
import axios from 'axios';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { loginStudent, loginEmployer } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    const student = JSON.parse(localStorage.getItem('student'));
    const employer = JSON.parse(localStorage.getItem('employer'));

    if(student) {
      alert('Already signed in as a student.')
    }
    else if(employer) {
      alert('Already signed in as an employer.')
    }
    else if (title === 'student') {
      try{
        const response = await loginStudent(data);
        navigate('/');
      }
      catch (e) {
        alert('No such student found');
      }
                
    } else if (title === 'Employer') {
      try{
        const response = await loginEmployer(data);
        navigate('/');
      }
      catch (e) {
        alert('No such employer found');
      }
    }
  }


  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <>
    <Header />
    <div className="login-page">
      
      <h2 className='login-page-title'>Login Page</h2>
      <div className="user-type">
        <input type="radio" name="user-type" onClick={handleTitleChange} value="student" id="student" />
        <label htmlFor="student">Student</label>
        <input type="radio" name="user-type" onClick={handleTitleChange} value="Employer" id="employer" />
        <label htmlFor="employer">Employer</label>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required id="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required id="password" />
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="signup-link">
        Don't have an account? <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
      </div>
    </div>
    </>
    
  );
};

export default LoginPage;
