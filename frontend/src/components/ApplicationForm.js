import React from 'react';
import '../styles/ApplicationForm.css'
import Header from './Header';

function ApplicationForm() {
  const applications = [
    { studentName: 'John Doe', jobTitle: 'Web Developer', applicationStatus: 'Submitted' },
    { studentName: 'Jane Smith', jobTitle: 'Marketing Specialist', applicationStatus: 'Accepted' },
    { studentName: 'Bob Johnson', jobTitle: 'Data Analyst', applicationStatus: 'Rejected' },
  ];

  return (
    <div>
      <Header/>
      <h2>Job Applications:</h2>
      <ul >
        {applications.map((application, index) => (
          <li className='container' key={index}>
            {application.studentName} applied for {application.jobTitle} and their application status is {application.applicationStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationForm;
