import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../styles/ApplyJob.css'

const ApplyJob = () => {
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });
//   const [job, setJob] = useState(null);
   const { jobId } = useParams();
  
  const job = {
        id: 1,
        title: 'Web Developer',
        company: 'Google',
        location: 'Mountain View, CA',
        description: 'We are looking for a skilled web developer to join our team',
  }

//   useEffect(() => {
//     fetch(`/api/jobs/${jobId}`)
//       .then(response => response.json())
//       .then(data => setJob(data));
//   }, [jobId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Here you can submit the form data to the backend
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Header/>
    <div className="apply-job-container">
        
        <div className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <h3 className="job-company">{job.company}</h3>
            <p className="job-location">{job.location}</p>
            <p className="job-description">{job.description}</p>
        </div>
      
      <h1 className="apply-job-title">Job's Application</h1>
      <form onSubmit={handleSubmit} className="apply-job-form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="form-field">
          <label htmlFor="resume">Resume:</label>
          <textarea name="resume" value={formData.resume} onChange={handleInputChange} />
        </div>
        <button type="submit" className="apply-job-btn">Apply</button>
      </form>
    </div>
    </>
    

  );
};

export default ApplyJob;
