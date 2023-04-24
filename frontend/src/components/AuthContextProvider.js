//import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const AuthProvider = ({ children }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginStudent = async (userData) => {
    const response = await axios.post('http://localhost:5000/student/login', userData, config);

    if (response.data) {
      localStorage.setItem('student', JSON.stringify(response.data));
    }
    return response;
  }

  const registerStudent = async (userData) => {
    const response = await axios.post('http://localhost:5000/student/register', userData, config);

    if (response.data) {
      localStorage.setItem('student', JSON.stringify(response.data));
    }
    return response    
  }

  const logoutStudent = () => localStorage.removeItem('student');



  const loginEmployer = async (userData) => {
    const response = await axios.post("http://localhost:5000/employer/login", userData);

    if (response.data) {
      localStorage.setItem('employer', JSON.stringify(response.data));
    }
    return response.data
  }

  const registerEmployer = async (userData) => {
    const response = await axios.post('http://localhost:5000/employer/register', userData, config);

    if (response.data) {
      localStorage.setItem('employer', JSON.stringify(response.data));
    }
    return response.data    
  }

  const logoutEmployer = () => localStorage.removeItem('employer');

  const getStudentFromLocalStorage = () => {
    const student = localStorage.getItem('student');
    if (student) {
      return JSON.parse(student);
    } else {
      return null;
    }
  }

  const getEmployerFromLocalStorage = () => {
    const employer = localStorage.getItem('employer');
    if (employer) {
      return JSON.parse(employer);
    } else {
      return null;
    }
  }


  return (
    <AuthContext.Provider value={{ loginStudent, loginEmployer, registerStudent, registerEmployer, logoutEmployer, logoutStudent, getEmployerFromLocalStorage, getStudentFromLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};