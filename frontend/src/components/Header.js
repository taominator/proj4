import React,{useState, useEffect} from 'react'
import { Link, Navigate } from 'react-router-dom';
import '../styles/Header.css'
import { AuthContext } from "./AuthContext";
import { useContext } from "react";


export default function Header() {
  const { getStudentFromLocalStorage, getEmployerFromLocalStorage } = useContext(AuthContext);

  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(null);
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(null);

  useEffect( () => {
    setIsStudentLoggedIn(getStudentFromLocalStorage);
    setIsEmployerLoggedIn(getEmployerFromLocalStorage);
    // console.log(isStudentLoggedIn);
    // console.log(isEmployerLoggedIn);
  }, [])

  

  const handleSignOut = () => {

    const employer = JSON.parse(localStorage.getItem('employer'));
    if (employer) {
      localStorage.removeItem('employer');
    }

    const student = JSON.parse(localStorage.getItem('student'));
    if (student) {
      localStorage.removeItem('student');
    }
    Navigate('/')
    window.location.reload();

    // Navigate to the home page or any other desired page
    //navigate('/');

  };


  return (
    <nav>
      <h1>
        BullzShake
      </h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isEmployerLoggedIn && (<li><Link to="/createJob">Create Job</Link></li>)}
        {isEmployerLoggedIn && (<li><Link to="/employerJobs">MyJobs</Link></li>)}
        {isEmployerLoggedIn && (<li><Link to="/students">Students</Link></li>)}
        {isStudentLoggedIn && (<li><Link to="/studentsApplications">MyApplications</Link></li>)}
        {isStudentLoggedIn && (<li><Link to="/jobs">Jobs</Link></li>)}
        {/* {isEmployerLoggedIn && (<li><Link to="/employers">Employers</Link></li>)} */}
        {(isStudentLoggedIn || isEmployerLoggedIn) && (<li><Link to="/" onClick={handleSignOut}>Sign out</Link></li>)}
      </ul>
    </nav>
  )
}
