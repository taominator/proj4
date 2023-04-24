import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobList.css'
import Header from './Header';
import axios from 'axios';


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


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get('http://localhost:5000/student/students', config()) //dont kow what route to put here
     //.then(response => console.log(response.data));
      .then(response => setStudents(response.data));
  }, []);


  return (
    <div>
      <Header/>
      <div className='job-listing-title'><h2>All Students</h2></div>
      <div className="job-card-container">
  {students.map((student) => (
    <div key={student.student_id} className="job-card">
      <h2>{student.student_name}</h2>
      <h3>{student.student_email}</h3>
      <p>{student.student_major}</p>
    </div>
  ))}
</div>

  </div>
  );
};


export default StudentList;
