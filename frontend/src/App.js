import React from 'react';
import StudentList from './components/StudentList';
import JobList from './components/JobList';
import Home from './components/Home'
import ApplicationForm from './components/ApplicationForm';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup';
import ApplyJob from './components/ApplyJob';
import EmployerDashboard from './components/EmployerDashboard';
import MyApplications from './components/MyApplications';
import MyJobs from './components/MyJobs';
import CreateJob from './components/CreateJob';
import SeeApplications from './components/SeeApplications';
import EditJob from './components/EditJob';
import { AuthProvider } from "./components/AuthContextProvider";



function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/students" element={<StudentList />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/applications" element={<ApplicationForm />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/employerdashboard" element={<EmployerDashboard />} />
          <Route path="/studentsApplications" element={<MyApplications />} />
          <Route path="/employerJobs" element={<MyJobs />} />
          <Route path="/createjob" element={<CreateJob />} />
          <Route path="/employerJobs/job/:jobId" element={<SeeApplications />} />
          <Route path="/employerJobs/:jobId" element={<EditJob />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
