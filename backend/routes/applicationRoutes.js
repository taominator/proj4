const express = require('express');
const {
  createApplication,
  getApplications,
  getStudentApplications,
  getJobApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');

const { protectStudent } = require('../middleware/authStudentMiddleware');
const { protectEmployer } = require('../middleware/authEmployerMiddleware');

const router = express.Router();

router.post('/', protectStudent, createApplication);
router.get('/', getApplications);
router.get('/student/:id', getStudentApplications);
router.get('/job/:id', protectStudent, getJobApplications);
router.get('/student/:studentId/:jobId', protectStudent, getApplication);
router.post('/:studentId/:jobId', protectEmployer, updateApplication);
router.delete('/:studentId/:jobId', protectStudent, deleteApplication);

module.exports = router;
