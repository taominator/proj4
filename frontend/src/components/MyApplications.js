import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import '../styles/JobList.css'
import '../styles/myApplications.css'
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {

  const config = () => {
    const student = JSON.parse(localStorage.getItem('student'));
  
    if (!student) {
      return {};
    }
  
    return {
      headers: {
        Authorization: `Bearer ${student.token}`,
      },
    };
  };
        

    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (a_student_id, a_job_id) => {
      
          try{
            console.log(config());
            const response = await axios.delete(`http://localhost:5000/application/${a_student_id}/${a_job_id}`, config());
            console.log(response);
            alert("Application Deleted");
            //navigate('/studentsApplications');
          }
          catch (e) {
            alert("Oops! Something went wrong!");
          }
    }


    useEffect(() => {
        const student_id = JSON.parse(localStorage.getItem('student')).id;
        axios.get(`http://localhost:5000/application/student/${student_id}`, config()) //dont kow what route to put here
         //.then(response => console.log(response.data));
          .then(response => setApplications(response.data));
      }, [applications]);



return (
    <div>
      <Header />
      <div>
        <h2 className="job-listing-title">Applied Jobs</h2>
      </div>
      {applications.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="job-card-container">
          {applications.map((application) => (
            <div key={application.a_student_id} className="job-card">
              <h2>{application.job_title}</h2>
                <h3>{application.employer_name}</h3>
                <p>{application.employer_email}</p>
                <p>{application.job_description}</p>
                <p>{application.application_status}</p>
              <button className='delete' onClick={() => handleDelete(application.student_id, application.job_id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default MyApplications;
