import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobList.css'
import Header from './Header';
import axios from 'axios';



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


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const handleApply = async (jobId) => {
    // navigate(`/apply/${jobId}`);

    const data = {
      a_student_id : JSON.parse(localStorage.getItem('student')).id,
      a_job_id : jobId,
      application_status : 'Pending'
    }

    try{
      console.log(data);
      console.log(config());
      const response = await axios.post('http://localhost:5000/application/', data, config());
      console.log(response);
      alert("Thank you for applying!");
    }
    catch (e) {
      alert("Already applied to this job.");
    }

  };



  useEffect(() => {
    axios.get('http://localhost:5000/job/all', config()) //dont kow what route to put here
     //.then(response => console.log(response.data));
      .then(response => setJobs(response.data));
  }, []);


  return (
    <div>
      <Header/>
      <div className='job-listing-title'><h2>Job Postings</h2></div>
      <div className="job-card-container">
  {jobs.map((job) => (
    <div key={job.job_id} className="job-card">
      <h2>{job.job_title}</h2>
      <h3>{job.employer_name}</h3>
      <p>{job.employer_email}</p>
      <p>{job.job_description}</p>
      <button onClick={() => handleApply(job.job_id)}>Apply</button>
    </div>
  ))}
</div>

  </div>
  );
};


export default JobList;
