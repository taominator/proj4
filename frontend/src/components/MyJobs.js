import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import '../styles/JobList.css'
import '../styles/myApplications.css'
import { useNavigate } from 'react-router-dom';

const MyJobs = () => {

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
        

    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (job_id) => {
      
        try{
          console.log(config());
          const response = await axios.delete(`http://localhost:5000/Job/${job_id}`, config());
          console.log(response);
          alert("Job Deleted");
          //navigate('/studentsApplications');
        }
        catch (e) {
          alert("Oops! Something went wrong!");
        }
    }


    useEffect(() => {
        const employer_id = JSON.parse(localStorage.getItem('employer')).id;
        axios.get(`http://localhost:5000/job/employer/${employer_id}`, config()) //dont kow what route to put here
         //.then(response => console.log(response.data));
          .then(response => setJobs(response.data));
      }, [jobs]);


    const handleSeeApplicants = (job_id) => {
        navigate(`job/${job_id}`);
    }



return (
    <div>
      <Header />
      <div>
        <h2 className="job-listing-title">My Jobs</h2>
      </div>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="job-card-container">
          {jobs.map((job) => (
            <div key={job.job_id} className="job-card">
              <h2>{job.job_title}</h2>
                <h3>{job.job_description}</h3>
                {/* <p>{job.employer_email}</p> */}
                {/* <p>{application.job_description}</p> */}
              <button className='delete' onClick={() => handleDelete(job.job_id)}>
                Delete
              </button>
              <button className='delete' onClick={() => handleSeeApplicants(job.job_id)}>
                See Applicants
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default MyJobs;
