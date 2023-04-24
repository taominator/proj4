const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  const { job_title, job_description, job_employer_id } = req.body;

  if (!job_title || !job_description || !job_employer_id) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const job = await Job.create({
    job_title,
    job_description,
    job_employer_id,
  });

  res.status(201).json(job);
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.findAll();
  res.status(200).json(jobs);
});

// @desc    Get jobs by employer ID
// @route   GET /api/jobs/employer/:id
// @access  Private
const getEmployerJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.findEmployerJobs(req.params.id);
  res.status(200).json(jobs);
});

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  res.status(200).json(job);
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  const updatedJob = await Job.update(req.params.id, req.body);
  res.status(200).json(updatedJob);
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  await Job.delete(req.params.id);
  res.status(200).json({ success: true });
});

const getJobsWithEmployers = asyncHandler(async (req, res) => {
  const jobsWithEmployers = await Job.findAllWithEmployers();
  res.status(200).json(jobsWithEmployers);
});

module.exports = {
  createJob,
  getJobs,
  getEmployerJobs,
  getJob,
  updateJob,
  deleteJob,
  getJobsWithEmployers,
};
