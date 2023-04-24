const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');

// @desc    Create a new application
// @route   POST /api/applications
// @access  Private
const createApplication = asyncHandler(async (req, res) => {
  const { a_student_id, a_job_id, application_status } = req.body;

  if (!a_student_id || !a_job_id || !application_status) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const applicationExists = await Application.findById(a_student_id, a_job_id);

  if(applicationExists) {
    res.status(401);
    console.log('application exists');
    throw new Error('Application already exists!');
  }

  const application = await Application.create({
    a_student_id,
    a_job_id,
    application_status,
  });

  res.status(201).json(application);
});

// @desc    Get all applications
// @route   GET /api/applications
// @access  Public
const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.findAll();
  res.status(200).json(applications);
});

// @desc    Get all applications for a student
// @route   GET /api/applications/student/:id
// @access  Private
const getStudentApplications = asyncHandler(async (req, res) => {
  const applications = await Application.findStudentAll(req.params.id);
  res.status(200).json(applications);
});

// @desc    Get all applications for a job
// @route   GET /api/applications/job/:id
// @access  Private
const getJobApplications = asyncHandler(async (req, res) => {
  const applications = await Application.findJobAll(req.params.id);
  res.status(200).json(applications);
});

// @desc    Get application by student and job IDs
// @route   GET /api/applications/student/:studentId/job/:jobId
// @access  Private
const getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.studentId, req.params.jobId);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  res.status(200).json(application);
});

// @desc    Update application
// @route   PUT /api/applications/student/:studentId/job/:jobId
// @access  Private
const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.studentId, req.params.jobId);

  console.log(application);
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  const updatedApplication = await Application.update(req.params.studentId, req.params.jobId, req.body);
  res.status(200).json(updatedApplication);
});

// @desc    Delete application
// @route   DELETE /api/applications/student/:studentId/job/:jobId
// @access  Private
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.studentId, req.params.jobId);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  await Application.delete(req.params.studentId, req.params.jobId);
  res.status(200).json({ success: true });
});

module.exports = {
  createApplication,
  getApplications,
  getStudentApplications,
  getJobApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
