const express = require('express');
const {
  createJob,
  getJobs,
  getEmployerJobs,
  getJob,
  updateJob,
  deleteJob,
  getJobsWithEmployers
} = require('../controllers/jobController');

const { protectStudent } = require('../middleware/authStudentMiddleware');
const { protectEmployer } = require('../middleware/authEmployerMiddleware');

const router = express.Router();

router.post('/', protectEmployer, createJob);
router.get('/', protectStudent, getJobs);
router.get('/all', getJobsWithEmployers);
router.get('/employer/:id', protectEmployer, getEmployerJobs);
router.get('/:id', getJob);
router.post('/:id', protectEmployer, updateJob);
router.delete('/:id', protectEmployer, deleteJob);


module.exports = router;
