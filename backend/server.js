const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 8000;


//const pool = require('./config/db.js');
//const Student = require("./models/studentModel.js");
//Student.create({student_name : 'Fares Ibrahim', student_email : 'fares@usf.edu', student_major : 'Computer Engineering'})


const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/student', require('./routes/studentRoutes'))
app.use('/employer', require('./routes/employerRoutes'))
app.use('/job', require('./routes/jobRoutes'))
app.use('/application', require('./routes/applicationRoutes'))
/*
// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to BullzShake API' })
  })
}*/

//const {registerStudent, getStudents, getStudent, loginStudent } = require('./controllers/studentController');
//const {registerEmployer, getEmployers, getEmployer, loginEmployer} = require('./controllers/employerController');
//const {createJob, getEmployerJobs, getJob, getJobs, updateJob, deleteJob} = require('./controllers/jobController');
//const {createApplication, getApplications, getApplication, getStudentApplications, getJobApplications, updateApplication, deleteApplication} = require('./controllers/applicationController');

//app.get('/register1', registerStudent);
//app.get('/getAll', getStudents);
//app.get('/getOne/:id', getStudent);
//app.get('/login1', loginStudent)//;

//app.get('/register2', registerEmployer);
//app.get('/getAllEmployers', getEmployers);
//app.get('/getOneEmployer/:id', getEmployer);
//app.get('/login2', loginEmployer);

//app.get('/createJob', createJob);
//app.get('/getEmployerJobs/:id', getEmployerJobs);
//app.get('/getJob/:id', getJob);
//app.get('/getJobs', getJobs);
//app.get('/updateJob/:id', updateJob);
//app.get('/deleteJob/:id', deleteJob);

//app.get('/createApplication', createApplication);
//app.get('/getApplications', getApplications);
//app.get('/getApplication/:studentId/:jobId', getApplication);
//app.get('/getStudentApplications/:id', getStudentApplications);
//app.get('/getJobApplications/:id', getJobApplications);
//app.get('/updateApplication/:studentId/:jobId', updateApplication);
//app.get('/deleteApplication/:studentId/:jobId', deleteApplication);


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

