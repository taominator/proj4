import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'
import Header from './Header';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const { registerStudent, registerEmployer } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle signup logic here
    const student = JSON.parse(localStorage.getItem('student'));
    const employer = JSON.parse(localStorage.getItem('employer'));

    if(student) {
      alert('Already signed in as a student.')
    }
    else if(employer) {
      alert('Already signed in as an employer.')
    }
    else if (title === 'student') {
      const data = {
        student_name: name,
        student_email: email,
        student_major: major,
        password: password
      }

      
      try{
        await registerStudent(data);
        navigate('/');
      }
      catch (e) {
        alert(e);
      }
    } else {
      // Add employer registration logic here
      const data = {
        employer_name: companyName,
        employer_email: email,
        password: password
      }
      
      try{
        registerEmployer(data);
        navigate('/');
      }
      catch (e) {
        alert(e);
      }
      
    }
  }
  

  const handleLogIn = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  let fields;
  if (title === 'student') {
    fields = (
      <>
        <label className="signup-page-label">Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="signup-page-input" required />
        <label className="signup-page-label">Major:</label>
        <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className="signup-page-input" required />
      </>
    );
  } else if (title === 'Employer') {
    fields = (
      <>
        <label className="signup-page-label">Company Name:</label>
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="signup-page-input" required />
      </>
    );
  }

  return (
    <>
    <Header/>
    <div className="signup-page">
      <h2 className="signup-page-title">SIGN UP</h2>
      <div className="user-type">
        <label className="signup-page-label">User type:</label>
        <div className="radio-buttons">
          <input type="radio" name="user-type" onClick={handleTitleChange} value="student" className="radio-input" id="student-radio" />
          <label htmlFor="student-radio" className="radio-label">Student</label>
          <input type="radio" name="user-type" onClick={handleTitleChange} value="Employer" className="radio-input" id="employer-radio" />
          <label htmlFor="employer-radio" className="radio-label">Employer</label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {fields}
        <label className="signup-page-label">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-page-input" required />
        <label className="signup-page-label">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-page-input" required />
        <button type="submit" className="signup-btn">Sign up</button>
      </form>
      <div className="signup-link">
        Don't have an account? <button onClick={handleLogIn} className="signup-btn">Login</button>
      </div>
    </div>
    </>
    
  );
}

export default Signup;
