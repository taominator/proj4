import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobList.css'
import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';



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



  const acceptApplication = async (student_id, job_id) => {
    const data = {
        application_status : 'Accepted',
    }

        console.log(data);
        console.log(config());
        const response = await axios.post(`http://localhost:5000/application/${student_id}/${job_id}`, data, config());
        console.log(response);
        alert("Updated");
  
  }


  const rejectApplication = async (student_id, job_id) => {
    const data = {
        application_status : 'Rejected',
    }

        console.log(data);
        console.log(config());
        const response = await axios.post(`http://localhost:5000/application/${student_id}/${job_id}`, data, config());
        console.log(response);
        alert("Updated");
  
  }



const SeeApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const { jobId } = useParams();

//   const handleApply = async (jobId) => {
//     // navigate(`/apply/${jobId}`);

//     const data = {
//       a_student_id : JSON.parse(localStorage.getItem('student')).id,
//       a_job_id : jobId,
//       application_status : 'Applied'
//     }

//     try{
//       console.log(data);
//       console.log(config());
//       const response = await axios.post('http://localhost:5000/application/', data, config());
//       console.log(response);
//       alert("Thank you for applying!");
//     }
//     catch (e) {
//       alert("Already applied to this job.");
//     }

//   };



  useEffect(() => {
    axios.get(`http://localhost:5000/application/job/${jobId}`, config()) //dont kow what route to put here
     //.then(response => console.log(response.data));
      .then(response => setApplications(response.data));
  }, [applications]);


  const handleAccept = (student_id) => {
    acceptApplication(student_id, jobId);
  }

  const handleReject = (student_id) => {
    rejectApplication(student_id, jobId);
  }

  return (
    <div>
      <Header/>
      <div className='job-listing-title'><h2>Applications</h2></div>
      <div className="job-card-container">
  {applications.map((application) => (
    <div key={application.a_student_id} className="job-card">
      <h2>{application.student_name}</h2>
      <h3>{application.student_email}</h3>
      <p>{application.student_major}</p>
      <p>{application.application_status}</p>
      {application.application_status !== 'Accepted' && <button onClick={() => handleAccept(application.a_student_id)}>Accept</button>}
      {application.application_status !== 'Rejected' && <button onClick={() => handleReject(application.a_student_id)}>Reject</button>}
    </div>
  ))}
</div>

  </div>
  );
};


export default SeeApplications;
