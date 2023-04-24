import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Home.css'
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function Home() {
  const { getStudentFromLocalStorage, getEmployerFromLocalStorage } = useContext(AuthContext);

  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(null);
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(null);

  useEffect( () => {
    setIsStudentLoggedIn(getStudentFromLocalStorage);
    setIsEmployerLoggedIn(getEmployerFromLocalStorage);
    console.log(isStudentLoggedIn);
    console.log(isEmployerLoggedIn);
  }, [])


  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/signup');
  };
  

  return (
    <>
      <Header />
      <div className="container">
        <div className="home">
          <h1>Welcome to BullzShake</h1>
          {(!isStudentLoggedIn && !isEmployerLoggedIn) && (<button className="btn" onClick={handleGetStarted}>
            Get Started
          </button>)}
        </div>
      </div>
    </>
    
  );
}
