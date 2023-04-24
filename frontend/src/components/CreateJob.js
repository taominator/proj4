import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'
import Header from './Header';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const { registerStudent, registerEmployer } = useContext(AuthContext);


    const config = () => {
        const employer = JSON.parse(localStorage.getItem('employer'));
      
        if (!employer) {
          return {};
        }
      
        return {
          headers: {
            Authorization: `Bearer ${employer.token}`,
          },
        };
      };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const employer_id = JSON.parse(localStorage.getItem('employer')).id;

    const data = {
      job_title : jobTitle,
      job_description : jobDescription,
      job_employer_id : employer_id
    }   

    try{
        console.log(config());
        const response = await axios.post(`http://localhost:5000/Job/`, data, config());
        console.log(response);
        alert("Job created");
        navigate('/employerJobs');
      }
      catch (e) {
        alert("Oops! Something went wrong!");
      };
    }
  

    // let fields;

  return (
    <>
    <Header/>
    <div className="signup-page">
      <h2 className="signup-page-title">Create Job</h2>
      {/* <div className="user-type">
        <label className="signup-page-label">User type:</label>
        <div className="radio-buttons">
          <input type="radio" name="user-type" onClick={handleTitleChange} value="student" className="radio-input" id="student-radio" />
          <label htmlFor="student-radio" className="radio-label">Student</label>
          <input type="radio" name="user-type" onClick={handleTitleChange} value="Employer" className="radio-input" id="employer-radio" />
          <label htmlFor="employer-radio" className="radio-label">Employer</label>
        </div>
      </div> */}
      <form onSubmit={handleSubmit}>
        {/* {fields} */}
        <label className="signup-page-label">Job title:</label>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="signup-page-input" required />
        <label className="signup-page-label">Job description:</label>
        <input type="text" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="signup-page-input" required />
        <button type="submit" className="signup-btn">Create</button>
      </form>
      {/* <div className="signup-link">
        Don't have an account? <button onClick={handleLogIn} className="signup-btn">Login</button>
      </div> */}
    </div>
    </>
    
  );
}

export default CreateJob;
