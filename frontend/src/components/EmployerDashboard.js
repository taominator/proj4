import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Employerdashboard.css'
import Header from './Header';

const jobListings = [
  // {
  //   id: 1,
  //   title: 'Web Developer',
  //   company: 'Google',
  //   location: 'Mountain View, CA',
  //   description: 'We are looking for a skilled web developer to join our team',
  // },
  // {
  //   id: 2,
  //   title: 'Data Scientist',
  //   company: 'Facebook',
  //   location: 'Menlo Park, CA',
  //   description: 'We are looking for a data scientist to work on our user engagement team',
  // },
  // {
  //   id: 3,
  //   title: 'Software Engineer',
  //   company: 'Microsoft',
  //   location: 'Redmond, WA',
  //   description: 'We are looking for a software engineer to join our Azure team',
  // },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const handleSeeApplicants = (jobID) => {
    navigate(`/applicants/${jobID}`);
  }

  return (
    <>
    <Header/>
    <div className='job-listing-title'><h2>Your Job Listings</h2></div>
    <div className="job-card-container">
      <div className="job-listings">
        {jobListings.map(job => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <h3>{job.company}</h3>
            <p>{job.description}</p>
            <button onClick={() => handleSeeApplicants(job.id)}>See Applicants</button>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default EmployerDashboard;
